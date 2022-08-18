import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./ManagerHistory.css";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { UserActions } from "../../../../store/actions/UserActions";

const ManagerHistory = (props) => {
  let { id } = useParams();
  const TABLE_DATA = {
    COL_DEF: [
      { field: "id", hide: true },
      { field: "activity", filter: true, floatingFilter: true, sortable: true },
      { field: "date", filter: true, floatingFilter: true, sortable: true },
      { field: "details", filter: true, floatingFilter: true, sortable: true },
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
    dispatch(UserActions.getManagerHistory(id)).then((result) => {
      const rowDataFormatted = result.history.map((item) => {
        return {
          id: item.history_id,
          activity: item.activity,
          date: item.date,
          details: item.details,
        };
      });
      setRowData(rowDataFormatted);
    });
  }, [id]);

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
          <div className="section-title">Manager History</div>
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

export default ManagerHistory;
