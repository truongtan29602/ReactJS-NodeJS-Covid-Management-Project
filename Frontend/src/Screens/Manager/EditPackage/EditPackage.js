import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
  useRef,
} from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserActions } from "../../../store/actions/UserActions";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faTrash } from "@fortawesome/fontawesome-free-solid";
import Sidebar from "../Sidebar/Sidebar";
import "./EditPackage.css";
import EditPackageState from "../EditProduct/EditPackageState/EditPackageState";

const KEY_BACKSPACE = "Backspace";
const KEY_DELETE = "Delete";
const KEY_F2 = "F2";
const KEY_ENTER = "Enter";
const KEY_TAB = "Tab";

const EditPackage = (props) => {
  const param = useParams();
  const [rowData, setRowData] = useState([]);
  const [rowData2, setRowData2] = useState([]);
  const [editPackageState, setEditPackageState] = useState(false);
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
        filter: true,
        floatingFilter: true,
        sortable: true,
      },
      {
        field: "max",
        cellEditor: NumericEditor,
        cellEditorPopup: true,
        editable: true,
        filter: true,
        floatingFilter: true,
        sortable: true,
      },
      {
        field: "Details",
        cellRenderer: function (params) {
          return (
            <FontAwesomeIcon
              icon={faInfoCircle}
              onClick={() => {
                props.history.push(
                  `/manager/${param.id}/editProduct/${params.data.id}`
                );
              }}
              style={{ fontSize: 20, cursor: "pointer" }}
            />
          );
        },
      },
      {
        field: "Remove",
        cellRenderer: function (param) {
          return (
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => {
                dispatch(
                  UserActions.removeProductFromPackage(
                    param.data.id,
                    params.package_id
                  )
                ).then((result) => {
                  alert(`Product ${param.data.name} was removed successfully`);
                  refresh();
                });
              }}
              style={{ fontSize: 20, cursor: "pointer" }}
            />
          );
        },
      },
    ],
    DEFAULT_COL_DEF: {
      filter: "agTextColumnFilter",
      flex: 1,
    },
  };

  const TABLE_DATA_2 = {
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
  const params = useParams();
  const [_package, set_Package] = useState({
    package_id: null,
    name: "",
    max_per_person_per_duration: null,
    duration: null,
    duration_unit: "",
    image: "",
  });
  const [packageName, setPackageName] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [maxPerDuration, setMaxPerDuration] = useState();
  const [duration, setDuration] = useState();
  const [durationUnit, setDurationUnit] = useState("day");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [newSelectedProducts, setNewSelectedProducts] = useState([]);

  const updatePackage = () => {
    dispatch(
      UserActions.updatePackage(
        params.package_id,
        packageName,
        imageLink,
        maxPerDuration,
        duration,
        durationUnit
      )
    ).then((result) => {
      setEditPackageState(true);
      setError("");
      refresh();
    });
  };

  const updateProductPacking = () => {
    let isValid = true;
    if (selectedProducts.length <= 0) {
      setEditPackageState(true);
      setError("Must select at least one product to update");
      isValid = false;
    }
    selectedProducts.map((item) => {
      if (item.min && item.max ? item.min > item.max : true) {
        setEditPackageState(true);
        setError("Invalid minimum or maximum quantity for products");
        isValid = false;
      } else {
        item.min = parseInt(item.min);
        item.max = parseInt(item.max);
      }
    });
    if (!isValid) return;
    dispatch(
      UserActions.updatePacking(params.package_id, selectedProducts)
    ).then((result) => {
      alert(result.message);
      refresh();
    });
  };

  const addToPackage = () => {
    let isValid = true;
    if (newSelectedProducts.length <= 0) {
      setEditPackageState(true);
      setError("Must select at least one product to add to package");
      isValid = false;
    }
    newSelectedProducts.map((item) => {
      if (item.min && item.max ? item.min > item.max : true) {
        setEditPackageState(true);
        setError("Invalid minimum or maximum quantity for products");
        isValid = false;
      } else {
        item.min = parseInt(item.min);
        item.max = parseInt(item.max);
      }
    });
    if (!isValid) return;
    dispatch(
      UserActions.addToPackage(params.package_id, newSelectedProducts)
    ).then((result) => {
      alert(result.message);
      refresh();
    });
  };

  const refresh = () => {
    dispatch(UserActions.getPackageByID(parseInt(params.package_id))).then(
      (result) => {
        set_Package(result.package);
        const rowDataFormatted = result.products.map((item) => {
          return {
            id: item.product_id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity_unit: item.quantity_unit,
            min: item.min,
            max: item.max,
          };
        });
        setRowData(rowDataFormatted);
        setPackageName(result.package.name);
        setImageLink(result.package.image);
        setMaxPerDuration(result.package.max_per_person_per_duration);
        setDuration(result.package.duration);
        setDurationUnit(result.package.duration_unit);
      }
    );
    dispatch(UserActions.getProductsNotInPackage(params.package_id)).then(
      (result) => {
        const rowDataFormatted = result.products.map((item) => {
          return {
            id: item.product_id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity_unit: item.quantity_unit,
          };
        });
        setRowData2(rowDataFormatted);
      }
    );
  };

  useEffect(() => {
    dispatch(UserActions.getPackageByID(parseInt(params.package_id))).then(
      (result) => {
        set_Package(result.package);
        const rowDataFormatted = result.products.map((item) => {
          return {
            id: item.product_id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity_unit: item.quantity_unit,
            min: item.min,
            max: item.max,
          };
        });
        setRowData(rowDataFormatted);
        setPackageName(result.package.name);
        setImageLink(result.package.image);
        setMaxPerDuration(result.package.max_per_person_per_duration);
        setDuration(result.package.duration);
        setDurationUnit(result.package.duration_unit);
      }
    );
    dispatch(UserActions.getProductsNotInPackage(params.package_id)).then(
      (result) => {
        const rowDataFormatted = result.products.map((item) => {
          return {
            id: item.product_id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity_unit: item.quantity_unit,
          };
        });
        setRowData2(rowDataFormatted);
      }
    );
  }, []);

  return (
    <div className="user-list-wrapper">
      <Sidebar props={props} />
      <div className="col-9">
        <a
          href={"/manager/" + params.id + "/packageList"}
          className="btn btn-danger"
        >
          Back
        </a>
        <div className="section-title">Package details</div>
        <section className="product">
          <div className="product__photo">
            <div
              className="photo-container"
              style={{
                backgroundImage: `url(${_package.image})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="photo-album">
                <h3>{_package.name}</h3>
              </div>
            </div>
          </div>
          <div className="product__info">
            <div className="title">
              <h1>{_package.name}</h1>
              <span>Package id: {_package.package_id}</span>
            </div>
            <div className="price">
              Max / Duration:{" "}
              <span>{_package.max_per_person_per_duration} </span>/{" "}
              {_package.duration} {_package.duration_unit}
            </div>
            <div className="description">
              <h3 className="product-header">Description</h3>
              <ul>
                <li>
                  <span>
                    Max per person per duration:{" "}
                    {_package.max_per_person_per_duration}
                  </span>
                </li>
                <li>
                  <span>
                    Duration: {_package.duration} {_package.duration_unit}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <div className="col-12">
          <div className="managed-history ">
            <div className="section-title">Product list in package</div>
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
          <div className="w-100 text-center">
            <button
              className="btn btn-success w-25 text-center"
              onClick={updateProductPacking}
            >
              Update product packing
            </button>
          </div>
        </div>
        <div className="general-information">
          <h1 className="mx-5 mb-5">Edit package</h1>
          <div className="card card-bg mb-3 text-dark">
            <div className="card-body w-100">
              <h1>
                Package new information : <b className="text-danger"></b>
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
              <div className="w-100 text-center">
                <button
                  className="btn btn-success w-25 text-center"
                  onClick={updatePackage}
                >
                  Update package
                </button>
              </div>
              <div className="col-12">
                <div className="managed-history ">
                  <div className="section-title">
                    Select products to add to package
                  </div>
                  <div
                    className="ag-theme-alpine table-wrapper"
                    style={{ height: 650 }}
                  >
                    <AgGridReact
                      className="ag-theme-alpine"
                      defaultColDef={TABLE_DATA_2.DEFAULT_COL_DEF}
                      columnDefs={TABLE_DATA_2.COL_DEF}
                      rowData={rowData2}
                      paginationPageSize={10}
                      pagination={true}
                      multiSortKey="ctrl"
                      rowSelection="multiple"
                      rowMultiSelectWithClick={true}
                      onSelectionChanged={(e) => {
                        setNewSelectedProducts(e.api.getSelectedRows());
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="w-100 text-center">
                <button
                  className="btn btn-success w-25 text-center"
                  onClick={addToPackage}
                >
                  Add to package
                </button>
              </div>
            </div>
          </div>
        </div>
        <EditPackageState
          editPackageState={editPackageState}
          setEditPackageState={setEditPackageState}
          error={error}
          setError={setError}
        />
      </div>
    </div>
  );
};

export default EditPackage;
