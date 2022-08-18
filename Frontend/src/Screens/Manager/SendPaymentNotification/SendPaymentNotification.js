import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./SendPaymentNotification.css";
import Sidebar from "../Sidebar/Sidebar";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDollar } from "@fortawesome/free-solid-svg-icons";
import { UserActions } from "../../../store/actions/UserActions";

const SendPaymentNotification = (props) => {
  const param = useParams();
  const TABLE_DATA = {
    COL_DEF: [
      {
        field: "user_id",
        headerName: "User ID",
        filter: true,
        floatingFilter: true,
        sortable: true,
      },
      { field: "username", filter: true, floatingFilter: true, sortable: true },
      { field: "debt", filter: true, floatingFilter: true, sortable: true },
      {
        field: "send_noti",
        headerName: "Send notification",
        autoHeight: true,
        cellRenderer: function (params) {
          return (
            <FontAwesomeIcon
              icon={faCommentDollar}
              onClick={() => {
                dispatch(
                  UserActions.sendNotification(
                    parseInt(params.data.user_id),
                    params.data.debt
                  )
                ).then((result) => {
                  if (result.state) {
                    alert("Notification sent");
                    dispatch(UserActions.getInDebtUserList()).then((result) => {
                      console.log(result);
                      const rowDataFormatted = result.userList.map((item) => {
                        return {
                          user_id: item.user_id,
                          username: item.username,
                          debt: item.debt,
                        };
                      });
                      setRowData(rowDataFormatted);
                    });
                  }
                });
              }}
              style={{ fontSize: 20, cursor: "pointer", color: "#3965F3" }}
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
    dispatch(UserActions.getInDebtUserList()).then((result) => {
      const rowDataFormatted = result.userList.map((item) => {
        return {
          user_id: item.user_id,
          username: item.username,
          debt: item.debt,
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
          <div className="section-title">User list with debts</div>
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

export default SendPaymentNotification;
