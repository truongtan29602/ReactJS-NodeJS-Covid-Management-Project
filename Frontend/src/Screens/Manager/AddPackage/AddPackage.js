import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
  useRef,
} from "react";
import { useDispatch } from "react-redux";
import "./AddPackage.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Sidebar from "../Sidebar/Sidebar";
import { UserActions } from "../../../store/actions/UserActions";
import AddPackageState from "./AddPackageState/AddPackageState";

const KEY_BACKSPACE = "Backspace";
const KEY_DELETE = "Delete";
const KEY_F2 = "F2";
const KEY_ENTER = "Enter";
const KEY_TAB = "Tab";

const AddPackage = (props) => {
  const [packageName, setPackageName] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [maxPerDuration, setMaxPerDuration] = useState();
  const [duration, setDuration] = useState();
  const [durationUnit, setDurationUnit] = useState("day");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [addPackageState, setAddPackageState] = useState(false);
  const [error, setError] = useState("");

  const NumericEditor = memo(
    forwardRef((props, ref) => {
      const createInitialState = () => {
        let startValue;
        let highlightAllOnFocus = true;

        if (props.eventKey === KEY_BACKSPACE || props.eventKey === KEY_DELETE) {
          // if backspace or delete pressed, we clear the cell
          startValue = null;
        } else if (props.charPress) {
          // if a letter was pressed, we start with the letter
          startValue = props.charPress;
          highlightAllOnFocus = false;
        } else {
          // otherwise we start with the current value
          startValue = props.value;
          if (props.eventKey === KEY_F2) {
            highlightAllOnFocus = false;
          }
        }

        return {
          value: startValue,
          highlightAllOnFocus,
        };
      };

      const initialState = createInitialState();
      const [value, setValue] = useState(initialState.value);
      const [highlightAllOnFocus, setHighlightAllOnFocus] = useState(
        initialState.highlightAllOnFocus
      );
      const refInput = useRef(null);

      // focus on the input
      useEffect(() => {
        // get ref from React component
        const eInput = refInput.current;
        eInput.focus();
        if (highlightAllOnFocus) {
          eInput.select();

          setHighlightAllOnFocus(false);
        } else {
          // when we started editing, we want the caret at the end, not the start.
          // this comes into play in two scenarios:
          //   a) when user hits F2
          //   b) when user hits a printable character
          const length = eInput.value ? eInput.value.length : 0;
          if (length > 0) {
            eInput.setSelectionRange(length, length);
          }
        }
      }, []);

      /* Utility Methods */
      const cancelBeforeStart =
        props.charPress && "1234567890".indexOf(props.charPress) < 0;

      const isLeftOrRight = (event) => {
        return ["ArrowLeft", "ArrowLeft"].indexOf(event.key) > -1;
      };

      const isCharNumeric = (charStr) => {
        return !!/\d/.test(charStr);
      };

      const isKeyPressedNumeric = (event) => {
        const charStr = event.key;
        return isCharNumeric(charStr);
      };

      const deleteOrBackspace = (event) => {
        return [KEY_DELETE, KEY_BACKSPACE].indexOf(event.key) > -1;
      };

      const finishedEditingPressed = (event) => {
        const key = event.key;
        return key === KEY_ENTER || key === KEY_TAB;
      };

      const onKeyDown = (event) => {
        if (isLeftOrRight(event) || deleteOrBackspace(event)) {
          event.stopPropagation();
          return;
        }

        if (!finishedEditingPressed(event) && !isKeyPressedNumeric(event)) {
          if (event.preventDefault) event.preventDefault();
        }

        if (finishedEditingPressed(event)) {
          props.stopEditing();
        }
      };

      /* Component Editor Lifecycle methods */
      useImperativeHandle(ref, () => {
        return {
          // the final value to send to the grid, on completion of editing
          getValue() {
            return value;
          },

          // Gets called once before editing starts, to give editor a chance to
          // cancel the editing before it even starts.
          isCancelBeforeStart() {
            return cancelBeforeStart;
          },

          // Gets called once when editing is finished (eg if Enter is pressed).
          // If you return true, then the result of the edit will be ignored.
          isCancelAfterEnd() {
            // will reject the number if it greater than 1,000,000
            // not very practical, but demonstrates the method.
            return value > 50 || value < 1;
          },
        };
      });

      return (
        <input
          ref={refInput}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => onKeyDown(event)}
          style={{ width: "100%", height: "100%" }}
        />
      );
    })
  );

  const TABLE_DATA = {
    COL_DEF: [
      { field: "id", hide: true },
      {
        field: "image",
        headerName: "Product image",
        autoHeight: true,
        cellRenderer: function (params) {
          return (
            <img
              src={params.data.image}
              alt=""
              style={{ width: "75px", height: "75px" }}
            />
          );
        },
      },
      { field: "name", filter: true, floatingFilter: true, sortable: true },

      {
        field: "price",
        filter: true,
        floatingFilter: true,
        sortable: true,
      },
      {
        field: "quantity_unit",
        headerName: "Quantity unit",
        filter: true,
        floatingFilter: true,
        sortable: true,
      },
      {
        field: "min",
        cellEditor: NumericEditor,
        cellEditorPopup: true,
        editable: true,
      },
      {
        field: "max",
        cellEditor: NumericEditor,
        cellEditorPopup: true,
        editable: true,
      },
    ],
    DEFAULT_COL_DEF: {
      filter: "agTextColumnFilter",
      flex: 1,
    },
  };
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState([]);

  const createPackage = () => {
    let isValid = true;
    if (selectedProducts.length < 2) {
      setAddPackageState(true);
      setError("A package must contain at leasts 2 products");
      isValid = false;
    }
    selectedProducts.map((item) => {
      if (item.min && item.max ? item.min > item.max : true) {
        setAddPackageState(true);
        setError("Invalid minimum or maximum quantity for products");
        isValid = false;
      } else {
        item.min = parseInt(item.min);
        item.max = parseInt(item.max);
      }
    });
    if (!isValid) return;
    dispatch(
      UserActions.addPackage(
        packageName,
        imageLink,
        maxPerDuration,
        duration,
        durationUnit,
        selectedProducts
      )
    ).then((result) => {
      setAddPackageState(true);
      setError("");
    });
  };

  useEffect(() => {
    //call api
    dispatch(UserActions.getProductList()).then((result) => {
      const rowDataFormatted = result.productList.map((item) => {
        return {
          id: item.product_id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity_unit: item.quantity_unit,
        };
      });
      setRowData(rowDataFormatted);
    });
  }, []);

  return (
    <div className="add-package-wrapper">
      <Sidebar props={props} />
      <div className="col-9">
        <div className="general-information">
          <h1 className="mx-5 mb-5">Add new package</h1>
          <div className="card card-bg mb-3 text-dark">
            <div className="card-body w-100">
              <h1>
                Package information : <b className="text-danger"></b>
              </h1>
              <div className="input-group mb-3">
                <label
                  className="input-group-text text-form"
                  style={{ width: "15%" }}
                >
                  Package name
                </label>
                <input
                  type="text"
                  className="form-control text-form text-location-form"
                  placeholder="Input package name"
                  style={{ width: "85%" }}
                  value={packageName}
                  onChange={(e) => {
                    setPackageName(e.target.value);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <label
                  className="input-group-text text-form"
                  style={{ width: "15%" }}
                >
                  Image link
                </label>
                <input
                  type="text"
                  className="form-control text-form text-location-form"
                  placeholder="Input link of image"
                  style={{ width: "85%" }}
                  value={imageLink}
                  onChange={(e) => {
                    setImageLink(e.target.value);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <label
                  className="input-group-text text-form"
                  style={{ width: "15%" }}
                >
                  Max packages
                </label>
                <input
                  type="number"
                  className="form-control text-form text-location-form"
                  placeholder="Input maximum of packages per person per duration"
                  style={{ width: "85%" }}
                  value={maxPerDuration}
                  onChange={(e) => {
                    setMaxPerDuration(e.target.value);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <label
                  className="input-group-text text-form"
                  style={{ width: "15%" }}
                >
                  Duration
                </label>
                <input
                  type="number"
                  className="form-control text-form text-location-form"
                  placeholder="Input duration"
                  style={{ width: "85%" }}
                  value={duration}
                  onChange={(e) => {
                    setDuration(e.target.value);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <label
                  className="input-group-text text-form"
                  style={{ width: "15%" }}
                >
                  Duration unit
                </label>
                <select
                  className="form-select text-form"
                  style={{ width: "85%" }}
                  value={durationUnit}
                  onChange={(e) => {
                    setDurationUnit(e.target.value);
                  }}
                >
                  <option className="text-form" value="day" selected>
                    day
                  </option>
                  <option className="text-form" value="month">
                    month
                  </option>
                  <option className="text-form" value="year">
                    year
                  </option>
                </select>
              </div>

              <div className="col-12">
                <div className="section managed-history ">
                  <div className="section-title">
                    Select products to add to package
                  </div>
                  <div
                    className="ag-theme-alpine table-wrapper"
                    style={{ height: 650 }}
                  >
                    <AgGridReact
                      className="ag-theme-alpine"
                      defaultColDef={TABLE_DATA.DEFAULT_COL_DEF}
                      columnDefs={TABLE_DATA.COL_DEF}
                      rowData={rowData}
                      paginationPageSize={10}
                      pagination={true}
                      multiSortKey="ctrl"
                      rowSelection="multiple"
                      rowMultiSelectWithClick={true}
                      onSelectionChanged={(e) => {
                        setSelectedProducts(e.api.getSelectedRows());
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="w-100 text-center">
                <button
                  className="btn btn-success w-25 text-center"
                  onClick={createPackage}
                >
                  Create package
                </button>
              </div>
            </div>
          </div>
        </div>
        <AddPackageState
          addPackageState={addPackageState}
          setAddPackageState={setAddPackageState}
          error={error}
          setError={setError}
        />
      </div>
    </div>
  );
};

export default AddPackage;
