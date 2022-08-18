import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { UserActions } from "../../../store/actions/UserActions";
import UserSidebar from "../UserSidebar/UserSidebar";

const ManagedHistory = (props) => {
  const TABLE_DATA_STATE = {
    COL_DEF: [
      { field: "id", hide: true },
      { field: "date", filter: true, floatingFilter: true, sortable: true },
      {
        field: "previous",
        headerName: "Previous data",
        filter: true,
        floatingFilter: true,
        sortable: true,
      },
      {
        field: "updated",
        headerName: "Updated data",
        filter: true,
        floatingFilter: true,
        sortable: true,
      },
    ],
    DEFAULT_COL_DEF: {
      filter: "agTextColumnFilter",
      flex: 1,
    },
  };

  const TABLE_DATA_TL = {
    COL_DEF: [
      { field: "id", hide: true },
      { field: "date", filter: true, floatingFilter: true, sortable: true },
      {
        field: "previous",
        headerName: "Previous data",
        filter: true,
        floatingFilter: true,
        sortable: true,
      },
      {
        field: "updated",
        headerName: "Updated data",
        filter: true,
        floatingFilter: true,
        sortable: true,
      },
    ],
    DEFAULT_COL_DEF: {
      filter: "agTextColumnFilter",
      flex: 1,
    },
  };

  const [rowDataState, setRowDataState] = useState([]);
  const [rowDataTL, setRowDataTL] = useState([]);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(UserActions.getUserStateHistoryByID(params.user_id)).then(
      (result) => {
        const rowDataFormatted = result.historyList.map((item) => {
          return {
            id: item.user_history_id,
            date: item.date,
            previous: item.previous_data,
            updated: item.new_data,
          };
        });
        setRowDataState(rowDataFormatted);
      }
    );
    dispatch(
      UserActions.getUserTreatmentLocationHistoryByID(params.user_id)
    ).then((result) => {
      const rowDataFormatted = result.historyList.map((item) => {
        
        return {
          id: item.user_history_id,
          date: item.date,
          previous: item.prev,
          updated: item.new,
        };
      });
      setRowDataTL(rowDataFormatted);
    });
  }, []);
  return (
    <div className="user-list-wrapper">
      <UserSidebar props={props} />
      <div className="col-9">
        <div className="general-information">
          <div className="card-body">
            <div className="col-12">
              <div className="row">
                <h1 className="col-12">State history</h1>
              </div>
              <div
                className="ag-theme-alpine table-wrapper"
                style={{ height: 400 }}
              >
                <AgGridReact
                  className="ag-theme-alpine"
                  defaultColDef={TABLE_DATA_STATE.DEFAULT_COL_DEF}
                  columnDefs={TABLE_DATA_STATE.COL_DEF}
                  rowData={rowDataState}
                  paginationPageSize={10}
                  pagination={true}
                  multiSortKey="ctrl"
                />
              </div>
            </div>
            <div className="col-12">
              <div className="row">
                <h1 className="col-12">Treatment location history</h1>
              </div>
              <div
                className="ag-theme-alpine table-wrapper"
                style={{ height: 400 }}
              >
                <AgGridReact
                  className="ag-theme-alpine"
                  defaultColDef={TABLE_DATA_TL.DEFAULT_COL_DEF}
                  columnDefs={TABLE_DATA_TL.COL_DEF}
                  rowData={rowDataTL}
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

export default ManagedHistory;
