import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { UserActions } from "../../../store/actions/UserActions";
import UserSidebar from "../UserSidebar/UserSidebar";

const PersonalInfo = (props) => {
  const TABLE_DATA_RELATED = {
    COL_DEF: [
      { field: "id", hide: true },
      {
        field: "name",
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

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [nationalID, setNationalID] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [state, setState] = useState("NO");
  const [address, setAddress] = useState("");
  const [treatmentLocation, setTreatmentLocation] = useState("");

  const [rowDataRelated, setRowDataRelated] = useState([]);

  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    dispatch(UserActions.getUserByID(params.user_id)).then((result) => {
      setUsername(result.user.username);
      setName(result.user.name);
      setNationalID(result.user.national_id_char);
      setYearOfBirth(result.user.year_of_birth);
      setState(result.user.state);
      setAddress(result.user.address);
      dispatch(
        UserActions.getTreatmentLocationByID(result.user.treatment_location)
      ).then((result) => {
        setTreatmentLocation(result.treatmentLocation.name);
      });
    });
    dispatch(UserActions.getRelatedUserByID(params.user_id)).then((result) => {
      const rowDataFormatted = result.related_users.map((item) => {
        return {
          id: item.account_id,
          name: item.name,
        };
      });
      setRowDataRelated(rowDataFormatted);
    });
  }, []);
  return (
    <div className="user-list-wrapper">
      <UserSidebar props={props} />
      <div className="col-9">
        <div className="general-information">
          <h1 className="mx-5 mb-5" style={{ textAlign: "center" }}>
            <i className="fa fa-user"></i> Personal information
          </h1>
          <div className="container">
            <div className="row no-gutter">
              <div className="col-12">
                <div className="input-group mb-3">
                  <label
                    className="input-group-text text-form"
                    style={{ width: "15%" }}
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control text-form text-location-form"
                    placeholder="Input username"
                    style={{ width: "85%" }}
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    readOnly
                    disabled
                  />
                </div>
                <div className="input-group mb-3">
                  <label
                    className="input-group-text text-form"
                    style={{ width: "15%" }}
                  >
                    Fullname
                  </label>
                  <input
                    id="P_FullName"
                    name="P_FullName"
                    type="text"
                    className="form-control text-form text-location-form"
                    placeholder="Input fullname"
                    style={{ width: "85%" }}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    readOnly
                    disabled
                  />
                </div>
                <div className="input-group mb-3">
                  <label
                    className="input-group-text text-form"
                    style={{ width: "15%" }}
                  >
                    National ID
                  </label>
                  <input
                    id="P_IdentityCard"
                    name="P_IdentityCard"
                    type="number"
                    className="form-control text-form text-location-form"
                    placeholder="Input national identification number"
                    style={{ width: "50%" }}
                    value={nationalID}
                    onChange={(e) => {
                      setNationalID(e.target.value);
                    }}
                    readOnly
                    disabled
                  />
                  <label
                    className="input-group-text text-form"
                    style={{ width: "15%" }}
                  >
                    Birthyear
                  </label>
                  <input
                    id="P_YearOfBirth"
                    name="P_YearOfBirth"
                    type="number"
                    className="form-control text-form text-location-form"
                    placeholder="Input year of birth"
                    style={{ width: "0%" }}
                    value={yearOfBirth}
                    onChange={(e) => {
                      setYearOfBirth(e.target.value);
                    }}
                    readOnly
                    disabled
                  />
                  <label
                    className="input-group-text text-form"
                    style={{ width: "10%" }}
                  >
                    State
                  </label>
                  <select
                    className="form-select text-form"
                    id="P_Status"
                    name="P_Status"
                    style={{ width: "15%" }}
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                    }}
                    readOnly
                    disabled
                  >
                    <option className="text-form" value="NO">
                      Normal
                    </option>
                    <option className="text-form" value="F0">
                      F0
                    </option>
                    <option className="text-form" value="F1">
                      F1
                    </option>
                    <option className="text-form" value="F2">
                      F2
                    </option>
                    <option className="text-form" value="F3">
                      F3
                    </option>
                  </select>
                </div>
                <div className="input-group mb-3">
                  <label
                    className="input-group-text text-form"
                    style={{ width: "15%" }}
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="road"
                    className="p-pd-b-iu-input-general"
                    placeholder={"Input house number and street"}
                    style={{ width: "85%" }}
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    readOnly
                    disabled
                  />
                </div>
                <div className="input-group">
                  <label
                    className="input-group-text text-form"
                    style={{ width: "15%" }}
                  >
                    Treatment location
                  </label>
                  <input
                    className="form-select text-form"
                    id="P_TreatmentLocation"
                    name="P_TreatmentLocation"
                    style={{ width: "85%" }}
                    value={treatmentLocation}
                    onChange={(e) => {
                      setTreatmentLocation(e.target.value);
                    }}
                    readOnly
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <br/>
        <div className="container">
          <h1 className="col-12" style={{ textAlign: "center" }}>
            Related user list
          </h1>
          <div
            className="ag-theme-alpine table-wrapper"
            style={{ height: 400 }}
          >
            <AgGridReact
              className="ag-theme-alpine"
              defaultColDef={TABLE_DATA_RELATED.DEFAULT_COL_DEF}
              columnDefs={TABLE_DATA_RELATED.COL_DEF}
              rowData={rowDataRelated}
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

export default PersonalInfo;
