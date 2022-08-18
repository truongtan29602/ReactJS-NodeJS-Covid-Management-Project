import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./ProductList.css";
import Sidebar from "../Sidebar/Sidebar";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faTrash } from "@fortawesome/fontawesome-free-solid";
import { UserActions } from "../../../store/actions/UserActions";

const ProductList = (props) => {
  const param = useParams();
  const history = props.history;
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
        field: "edit",
        cellRenderer: function (params) {
          return (
            <FontAwesomeIcon
              icon={faPenSquare}
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
        field: "Delete",
        cellRenderer: function (params) {
          return (
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => {
                dispatch(UserActions.deleteProduct(params.data.id)).then(
                  (result) => {
                    if (!result.status) {
                      alert(result.error);
                      return;
                    }
                    dispatch(UserActions.getProductList()).then((result) => {
                      const rowDataFormatted = result.productList.map(
                        (item) => {
                          return {
                            id: item.product_id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                            quantity_unit: item.quantity_unit,
                          };
                        }
                      );
                      setRowData(rowDataFormatted);
                    });
                    alert(
                      "Product " + params.data.name + " deleted successfully"
                    );
                  }
                );
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
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState([]);

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
    <div className="user-list-wrapper">
      <Sidebar props={props} />
      <div className="col-9">
        <div className="section managed-history ">
          <div className="section-title">Product list</div>
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
