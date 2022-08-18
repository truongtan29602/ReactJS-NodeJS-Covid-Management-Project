import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./UserDetails.css";
import Sidebar from "../Sidebar/Sidebar";
import { UserActions } from "../../../store/actions/UserActions";

const UserDetails = (props) => {
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

  const TABLE_DATA_RELATED = {
    COL_DEF: [
      { field: "id", filter: true, floatingFilter: true, sortable: true },
      {
        field: "username",
        filter: true,
        floatingFilter: true,
        sortable: true,
      },
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
  const [rowDataState, setRowDataState] = useState([]);
  const [rowDataTL, setRowDataTL] = useState([]);
  const [rowDataRelated, setRowDataRelated] = useState([]);
  const [rowDataNonRelated, setRowDataNonRelated] = useState([]);

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [nationalID, setNationalID] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [state, setState] = useState("NO");
  const [address, setAddress] = useState("");
  const [treatmentLocationID, setTreatmentLocationID] = useState("");
  const [treatmentLocation, setTreatmentLocation] = useState("");
  const [treatmentLocationList, setTreatmentLocationList] = useState();
  const [newTreatmentLocation, setNewTreatmentLocation] = useState("");
  const [newState, setNewState] = useState("NO");
  const [nonRelatedUser, setNonRelatedUser] = useState({});

  const params = useParams();
  const dispatch = useDispatch();
  const refreshData = () => {
    dispatch(UserActions.getUserByID(params.user_id)).then((result) => {
      setUsername(result.user.username);
      setName(result.user.name);
      setNationalID(result.user.national_id_char);
      setYearOfBirth(result.user.year_of_birth);
      setState(result.user.state);
      switch (result.user.state) {
        case "NO": {
          setNewState("F3");
          break;
        }
        case "F3": {
          setNewState("F2");
          break;
        }
        case "F2": {
          setNewState("F1");
          break;
        }
        case "F1": {
          setNewState("F0");
          break;
        }
        case "F0": {
          setNewState("F0");
          break;
        }
        default:
          break;
      }
      setAddress(result.user.address);
      setTreatmentLocationID(result.user.treatment_location);
      setNewTreatmentLocation(result.user.treatment_location);
      dispatch(
        UserActions.getTreatmentLocationByID(result.user.treatment_location)
      ).then((result) => {
        setTreatmentLocation(result.treatmentLocation.name);
      });
    });
    dispatch(UserActions.getTreatmentLocationList()).then((result) => {
      const data = result.treatmentLocationList.map((item) => {
        return {
          id: item.location_id,
          location_name: item.name,
          capacity: item.capacity,
          current_patients: item.current_patients_number,
        };
      });
      setTreatmentLocationList(data);
    });
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
    dispatch(UserActions.getRelatedUserByID(params.user_id)).then((result) => {
      const rowDataFormatted = result.related_users.map((item) => {
        return {
          id: item.account_id,
          username: item.username,
          name: item.name,
        };
      });
      setRowDataRelated(rowDataFormatted);
    });
    dispatch(UserActions.getNonRelatedUserByID(params.user_id)).then(
      (result) => {
        const data = result.non_related_users.map((item) => {
          return {
            id: item.account_id,
            username: item.username,
            name: item.name,
          };
        });
        setRowDataNonRelated(data);
      }
    );
  };

  useEffect(() => {
    dispatch(UserActions.getUserByID(params.user_id)).then((result) => {
      setUsername(result.user.username);
      setName(result.user.name);
      setNationalID(result.user.national_id_char);
      setYearOfBirth(result.user.year_of_birth);
      setState(result.user.state);
      switch (result.user.state) {
        case "NO": {
          setNewState("F3");
          break;
        }
        case "F3": {
          setNewState("F2");
          break;
        }
        case "F2": {
          setNewState("F1");
          break;
        }
        case "F1": {
          setNewState("F0");
          break;
        }
        case "F0": {
          setNewState("F0");
          break;
        }
        default:
          break;
      }
      setAddress(result.user.address);
      setTreatmentLocationID(result.user.treatment_location);
      setNewTreatmentLocation(result.user.treatment_location);
      dispatch(
        UserActions.getTreatmentLocationByID(result.user.treatment_location)
      ).then((result) => {
        setTreatmentLocation(result.treatmentLocation.name);
      });
    });
    dispatch(UserActions.getTreatmentLocationList()).then((result) => {
      const data = result.treatmentLocationList.map((item) => {
        return {
          id: item.location_id,
          location_name: item.name,
          capacity: item.capacity,
          current_patients: item.current_patients_number,
        };
      });
      setTreatmentLocationList(data);
    });
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

    dispatch(UserActions.getRelatedUserByID(params.user_id)).then((result) => {
      const rowDataFormatted = result.related_users.map((item) => {
        return {
          id: item.account_id,
          username: item.username,
          name: item.name,
        };
      });
      setRowDataRelated(rowDataFormatted);
    });
    dispatch(UserActions.getNonRelatedUserByID(params.user_id)).then(
      (result) => {
        const data = result.non_related_users.map((item) => {
          return {
            id: item.account_id,
            username: item.username,
            name: item.name,
          };
        });
        setRowDataNonRelated(data);
      }
    );
  }, []);

  const changeState = () => {
    if (newState === state) {
      alert("Please select a new state to update");
      return;
    }
    dispatch(
      UserActions.updateUserState(params.id, params.user_id, state, newState)
    ).then((result) => {
      alert(result.message);
      refreshData();
    });
    let newRelatedState;
    switch (newState) {
      case "F3": {
        newRelatedState = "NO";
        break;
      }
      case "F2": {
        newRelatedState = "F3";
        break;
      }
      case "F1": {
        newRelatedState = "F2";
        break;
      }
      case "F0": {
        newRelatedState = "F1";
        break;
      }
      default: {
        newRelatedState = "NO";
        break;
      }
    }
    dispatch(UserActions.getRelatedUserByID(params.user_id)).then((result) => {
      result.related_users.map((item) => {
        dispatch(UserActions.getUserByID(item.account_id)).then(
          (related_user) => {
            if (related_user.user.state === newRelatedState);
            else if (related_user.user.state === "F0");
            else if (
              related_user.user.state === "F1" &&
              (newRelatedState === "F2" ||
                newRelatedState === "F3" ||
                newRelatedState === "NO")
            );
            else if (
              related_user.user.state === "F2" &&
              (newRelatedState === "F3" || newRelatedState === "NO")
            );
            else if (
              related_user.user.state === "F3" &&
              newRelatedState === "NO"
            );
            else {
              console.log(related_user.user.state);
              console.log(newRelatedState);
              dispatch(
                UserActions.updateUserState(
                  parseInt(params.id),
                  parseInt(related_user.user.account_id),
                  related_user.user.state,
                  newRelatedState
                )
              ).then((result) => {});
            }
          }
        );
        return item;
      });
    });
  };
  const changeTreatmentLocation = () => {
    if (treatmentLocationID === newTreatmentLocation) {
      alert("Please select a new treatment location to update");
      return;
    }
    dispatch(
      UserActions.updateUserTreatmentLocation(
        params.id,
        params.user_id,
        treatmentLocationID,
        newTreatmentLocation
      )
    ).then((result) => {
      alert(result.message);
      refreshData();
    });
  };

  const addRelatedUser = () => {
    if (nonRelatedUser === {}) {
      alert("Please select a related user to add");
      return;
    }

    dispatch(
      UserActions.addRelatedUser(params.user_id, nonRelatedUser[0].id)
    ).then((result) => {
      if (result.addRelationState) {
        alert("Related user added successfully");
      } else {
        alert(result.err);
      }
      refreshData();
    });
  };

  return (
    <>
      <div className="content row">
        <Sidebar props={props} />
        <div className="col-9">
          <a
            href={"/manager/" + params.id + "/userList"}
            className="btn btn-danger"
          >
            Back
          </a>
          <div className="general-information">
            <h1 className="mx-5 mb-5">
              <i className="fa fa-list-ul"></i> User Details
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
            <br />
            <div className="row">
              <div className="col-4">
                <div className="card mb-3" style={{ minHeight: "100px" }}>
                  <div className="card-body h-100">
                    <h1>Edit state</h1>
                    <label className="form-label text-form ">
                      Current state
                    </label>
                    <input
                      type="text"
                      id="from"
                      className="form-control text-center text-form"
                      placeholder="State"
                      value={state}
                      name="from"
                      readOnly
                      disabled
                    />
                    <br />
                    <label className="form-label text-form ">
                      Update state
                    </label>
                    <select
                      className="form-select text-center text-form "
                      value={newState}
                      onChange={(e) => {
                        setNewState(e.target.value);
                      }}
                    >
                      {state === "NO" ? (
                        <>
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
                        </>
                      ) : state === "F3" ? (
                        <>
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
                        </>
                      ) : state === "F2" ? (
                        <>
                          <option className="text-form" value="F0">
                            F0
                          </option>

                          <option className="text-form" value="F1">
                            F1
                          </option>
                          <option className="text-form" value="F2">
                            F2
                          </option>
                        </>
                      ) : state === "F1" ? (
                        <>
                          <option className="text-form" value="F0">
                            F0
                          </option>

                          <option className="text-form" value="F1">
                            F1
                          </option>
                        </>
                      ) : (
                        <>
                          <option className="text-form" value="F0">
                            F0
                          </option>
                        </>
                      )}
                    </select>
                  </div>
                  <button className="btn btn-success" onClick={changeState}>
                    Update
                  </button>
                </div>
              </div>
              <div className="col-8">
                <div className="card mb-3" style={{ minHeight: "100px" }}>
                  <div className="card-body h-100">
                    <h1>Edit treatment location</h1>
                    <label className="form-label text-form ">
                      Current treatment location
                    </label>
                    <input
                      type="text"
                      id="from"
                      className="form-control text-center text-form"
                      placeholder="State"
                      value={treatmentLocation}
                      readOnly
                      disabled
                    />
                    <br />
                    <label className="form-label text-form ">
                      Update treatment location
                    </label>
                    <select
                      className="form-select text-form"
                      id="P_TreatmentLocation"
                      name="P_TreatmentLocation"
                      style={{ width: "85%" }}
                      value={newTreatmentLocation}
                      onChange={(e) => {
                        setNewTreatmentLocation(e.target.value);
                      }}
                    >
                      {treatmentLocationList
                        ? treatmentLocationList.map((item, index) => {
                            const isFull =
                              item.current_patients >= item.capacity;
                            if (
                              isFull ||
                              item.location_name === treatmentLocation
                            ) {
                              return (
                                <option
                                  id={index}
                                  className="text-form"
                                  value={item.id}
                                  disabled
                                >
                                  {item.location_name}
                                </option>
                              );
                            } else {
                              if (newTreatmentLocation === "") {
                                setNewTreatmentLocation(item.id);
                                return (
                                  <option
                                    id={index}
                                    className="text-form"
                                    value={item.id}
                                    selected
                                  >
                                    {item.location_name}
                                  </option>
                                );
                              }
                              return (
                                <option
                                  id={index}
                                  className="text-form"
                                  value={item.id}
                                >
                                  {item.location_name}
                                </option>
                              );
                            }
                          })
                        : null}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={changeTreatmentLocation}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="card-body">
                    <div className="col-12">
                      <div className="row">
                        <h1 className="col-12">
                          History management - State history
                        </h1>
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
                        <h1 className="col-12">
                          History management - Treatment location history
                        </h1>
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
              <div className="card card-bg mb-3 text-dark">
                <h1 style={{ textAlign: "center" }}>Add related user: </h1>

                <div
                  className="ag-theme-alpine table-wrapper"
                  style={{ height: 400 }}
                >
                  <AgGridReact
                    className="ag-theme-alpine"
                    defaultColDef={TABLE_DATA_RELATED.DEFAULT_COL_DEF}
                    columnDefs={TABLE_DATA_RELATED.COL_DEF}
                    rowData={rowDataNonRelated}
                    paginationPageSize={10}
                    pagination={true}
                    multiSortKey="ctrl"
                    rowSelection="single"
                    onSelectionChanged={(e) => {
                      setNonRelatedUser(e.api.getSelectedRows());
                    }}
                  />
                </div>
                <button
                  className="btn btn-success text-center"
                  onClick={addRelatedUser}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
