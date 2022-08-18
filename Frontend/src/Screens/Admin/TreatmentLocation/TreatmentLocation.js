import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { UserActions } from "../../../store/actions/UserActions";
import "./TreatmentLocation.css";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";

const TreatmentLocation = (props) => {
  const dispatch = useDispatch();
  const TABLE_DATA = {
    COL_DEF: [
      { field: "id", filter: true, floatingFilter: true, sortable: true },
      {
        field: "location_name",
        headerName: "Location Name",
        filter: true,
        floatingFilter: true,
        sortable: true,
      },
      { field: "capacity", filter: true, floatingFilter: true, sortable: true },
      {
        field: "current_patients",
        headerName: "Current Patients",
        filter: true,
        floatingFilter: true,
        sortable: true,
      },
      {
        field: "settings",
        cellRenderer: function (params) {
          return (
            <>
              <div className="treatment-settings-wrapper">
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  onClick={() => {
                    props.history.push(
                      `/admin/treatment/edit/${params.data.id}`
                    );
                  }}
                  style={{ fontSize: 16, cursor: "pointer" }}
                />
              </div>
            </>
          );
        },
      },
    ],
    DEFAULT_COL_DEF: {
      filter: "agTextColumnFilter",
      flex: 1,
    },
  };
  const [rowData, setRowData] = useState([]);

  useEffect(
    () => {
      //call api
      dispatch(UserActions.getTreatmentLocationList()).then((result) => {
        const rowDataFormatted = result.treatmentLocationList.map((item) => {
          return {
            id: item.location_id,
            location_name: item.name,
            capacity: item.capacity,
            current_patients: item.current_patients_number,
            settings: "",
          };
        });
        setRowData(rowDataFormatted);
      });
    },
    //const rowdataFormatted = res.data.map((item) => {return {
    //status: item.status,
    //});
    //setRowData}
    []
  );
  return (
    <div className="content row">
      <div className="sidebar">
        <div className="sidebar-item">
          <div className="title">
            <span className="angle-right">
              <i className="fas fa-angle-right"></i>{" "}
            </span>
            <span className="angle-đown d-none">
              <i className="fas fa-angle-down"></i>{" "}
            </span>
            Treatment location
          </div>
          <ul className="list">
            <li className="list-item">
              <Link to="/admin" className="d-block">
                <i className="fas fa-home"></i> Home
              </Link>
            </li>
            <li className="list-item">
              <Link to="/admin/create" className="d-block">
                <i className="fas fa-user"></i> Create new manager
              </Link>
            </li>
            <li className="list-item">
              <Link to="/admin/manage" className="d-block">
                <i className="fas fa-cog"></i> Manager management
              </Link>
            </li>
            <li className="list-item active">
              <Link to="/admin/treatment" className="d-block">
                <i className="fas fa-hospital"></i> Treatment Location
              </Link>
            </li>
          </ul>
          <div className="title">
            <Link to="/sign-in" className="d-block">
              <span className="angle-right">
                <i className="fas fa-angle-right"></i>{" "}
              </span>
              Logout
            </Link>
          </div>
        </div>
      </div>

      <div className="col-9">
        <div className="section">
          <div className="section-title">Treatment/Isolation location list</div>
          <div
            className="ag-theme-alpine table-wrapper"
            style={{ height: 550 }}
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
        <button
          className="btn-create-treatment-location"
          onClick={() => props.history.push("/admin/treatment/create")}
        >
          Add new location
        </button>
      </div>
    </div>
  );
};

export default TreatmentLocation;
