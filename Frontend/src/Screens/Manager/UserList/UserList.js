import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./UserList.css";
import Sidebar from "../Sidebar/Sidebar";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/fontawesome-free-solid";
import { UserActions } from "../../../store/actions/UserActions";

const UserList = (props) => {
  const param = useParams();

  const TABLE_DATA = {
    COL_DEF: [
      { field: "id", hide: true },
      { field: "status", filter: true, floatingFilter: true, sortable: true },
      { field: "username", filter: true, floatingFilter: true, sortable: true },
      {
        field: "details",
        cellRenderer: function (params) {
          return (
            <FontAwesomeIcon
              icon={faInfoCircle}
              onClick={() => {
                props.history.push(
                  `/manager/${param.id}/detail/${params.data.id}`
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
      dispatch(UserActions.getUserList()).then((result) => {
        const rowDataFormatted = result.userList.map((item) => {
          return {
            id: item.account_id,
            status: item.status,
            username: item.username,
            details: "",
          };
        });
        setRowData(rowDataFormatted);
      });
    },
    []
  );
  return (
    <div className="user-list-wrapper">
      <Sidebar props={props} />
      <div className="col-9">
        <div className="section managed-history ">
          <div className="section-title">User list</div>
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
              multiSortKey='ctrl'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
