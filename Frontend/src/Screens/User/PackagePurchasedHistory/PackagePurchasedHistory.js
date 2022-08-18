import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { UserActions } from "../../../store/actions/UserActions";
import UserSidebar from "../UserSidebar/UserSidebar";

const PackagePurchasedHistory = (props) => {
  const TABLE_DATA = {
    COL_DEF: [
      { field: "id", hide: true },
      { field: "date", filter: true, floatingFilter: true, sortable: true },
      {
        field: "package",
        filter: true,
        floatingFilter: true,
        sortable: true,
      }
    ],
    DEFAULT_COL_DEF: {
      filter: "agTextColumnFilter",
      flex: 1,
    },
  };

  const [rowData, setRowData] = useState([]);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(UserActions.getUserPackagePurchasedHistoryByID(params.user_id)).then(
      (result) => {
        const rowDataFormatted = result.historyList.map((item) => {
          return {
            id: item.user_history_id,
            date: item.date,
            package: item.package
          };
        });
        setRowData(rowDataFormatted);
      }
    );
  }, []);
  return (
    <div className="user-list-wrapper">
      <UserSidebar props={props} />
      <div className="col-9">
        <div className="general-information">
          <div className="card-body">
            <div className="col-12">
              <div className="row">
                <h1 className="col-12">Package purchased history</h1>
              </div>
              <div
                className="ag-theme-alpine table-wrapper"
                style={{ height: 400 }}
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
      </div>
    </div>
  );
};

export default PackagePurchasedHistory;
