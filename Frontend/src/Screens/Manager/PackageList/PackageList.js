import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./PackageList.css";
import Sidebar from "../Sidebar/Sidebar";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faTrash } from "@fortawesome/fontawesome-free-solid";
import { UserActions } from "../../../store/actions/UserActions";

const PackageList = (props) => {
  const param = useParams();
  const TABLE_DATA = {
    COL_DEF: [
      { field: "id", hide: true },
      {
        field: "image",
        headerName: "Package image",
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
      {
        field: "name",
        minWidth: 100,
        filter: true,
        floatingFilter: true,
        sortable: true,
        width: 100,
      },

      {
        field: "max_per_person_per_duration",
        headerName: "Max per duration",
        filter: true,
        floatingFilter: true,
        sortable: true,
      },
      {
        field: "duration",
        filter: true,
        floatingFilter: true,
        sortable: true,
      },
      {
        field: "duration_unit",
        headerName: "Duration unit",
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
                  `/manager/${param.id}/editPackage/${params.data.id}`
                );
              }}
              style={{ fontSize: 20, cursor: "pointer" }}
            />
          );
        },
      },
      {
        field: "delete",
        cellRenderer: function (params) {
          return (
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => {
                dispatch(UserActions.deletePackage(params.data.id)).then(
                  (result) => {
                    dispatch(UserActions.getPackageList()).then((result) => {
                      const rowDataFormatted = result.packageList.map(
                        (item) => {
                          return {
                            id: item.package_id,
                            name: item.name,
                            max_per_person_per_duration:
                              item.max_per_person_per_duration,
                            duration: item.duration,
                            duration_unit: item.duration_unit,
                            image: item.image,
                          };
                        }
                      );
                      setRowData(rowDataFormatted);
                    });
                  }
                );
                alert("Package " + params.data.name + " deleted successfully");
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
    dispatch(UserActions.getPackageList()).then((result) => {
      const rowDataFormatted = result.packageList.map((item) => {
        return {
          id: item.package_id,
          name: item.name,
          max_per_person_per_duration: item.max_per_person_per_duration,
          duration: item.duration,
          duration_unit: item.duration_unit,
          image: item.image,
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
          <div className="section-title">Package list</div>
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

export default PackageList;
