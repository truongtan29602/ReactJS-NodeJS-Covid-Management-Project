import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { UserActions } from "../../../store/actions/UserActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Manager.css";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { faInfoCircle } from "@fortawesome/fontawesome-free-solid";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";

const Manager = (props) => {
  const TABLE_DATA = {
    COL_DEF: [
      { field: "id", hide: true },
      { field: "status", filter: true, floatingFilter: true, sortable: true },
      { field: "manager", filter: true, floatingFilter: true, sortable: true },
      {
        field: "activity",
        cellRenderer: function (params) {
          return (
            <FontAwesomeIcon
              icon={faInfoCircle}
              onClick={() => {
                props.history.push(`/admin/manager/detail/${params.data.id}`);
              }}
              style={{ fontSize: 16, cursor: "pointer" }}
            />
          );
        },
      },
      {
        field: "account_management",
        headerName: "Lock/Unlock",
        cellRenderer: function (params) {
          return (
            <FontAwesomeIcon
              icon={
                params.data.account_management === "active" ? faLock : faUnlock
              }
              onClick={() => {
                dispatch(
                  UserActions.changeAccountStatus(
                    params.data.id,
                    params.data.status
                  )
                ).then((result) => {
                  dispatch(UserActions.getManagerList()).then((result) => {
                    const rowDataFormatted = result.managerList.map((item) => {
                      return {
                        id: item.account_id,
                        status: item.status,
                        manager: item.username,
                        activity: "",
                        account_management: item.status,
                      };
                    });
                    setRowData(rowDataFormatted);
                  });
                });
                alert(
                  "Status of account " +
                    params.data.manager +
                    " changed successfully"
                );
              }}
              style={{ fontSize: 16, cursor: "pointer" }}
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

  useEffect(
    () => {
      //call api
      dispatch(UserActions.getManagerList()).then((result) => {
        const rowDataFormatted = result.managerList.map((item) => {
          return {
            id: item.account_id,
            status: item.status,
            manager: item.username,
            activity: "",
            account_management: item.status,
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
            Manager Management
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
            <li className="list-item active">
              <Link to="/admin/manage" className="d-block">
                <i className="fas fa-cog"></i> Manager management
              </Link>
            </li>
            <li className="list-item">
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
        <div className="section managed-history ">
          <div className="section-title">Manager account list</div>
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
      </div>
    </div>
  );
};

export default Manager;
