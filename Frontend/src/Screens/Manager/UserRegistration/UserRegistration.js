import React from "react";
import { Fragment, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./UserRegistration.css";
import Sidebar from "../Sidebar/Sidebar";
import UserRegistrationState from "./UserRegistrationState/UserRegistrationState";
import { UserActions } from "../../../store/actions/UserActions";
import { Formik, Field } from "formik";

import locations from "../../../assets/json_location/locations";

const initialValues2 = {
  address: "",
  city: "",
  district: "",
  ward: "",
  road: "",
  type: 1,
};

const UserRegistration = (props) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [nationalID, setNationalID] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [state, setState] = useState("NO");
  const [location, setLocation] = useState("");
  const [treatmentLocation, setTreatmentLocation] = useState("");
  const [relatedUser, setRelatedUser] = useState();
  const [relatedUsersList, setRelatedUsersList] = useState([]);
  const [treatmentLocationList, setTreatmentLocationList] = useState();

  const [registerState, setRegisterState] = useState(false);
  const [error, setError] = useState("");

  const params = useParams();
  const dispatch = useDispatch();
  const submitUserRegistrationForm = () => {
    const data = {
      name: name,
      username: username,
      role: "user",
      status: "active",
      national_id: nationalID,
      year_of_birth: yearOfBirth,
      address: getFullAddress(
        location.road,
        location.city,
        location.district,
        location.ward
      ),
      state: state,
      treatment_location: treatmentLocation,
      related_user: relatedUser,
    };
    dispatch(UserActions.signUpUser(data)).then((result) => {
      if (!result.registerState) {
        setRegisterState(true);
        setError(result.error);
      } else {
        setRegisterState(true);
        setError("");
      }
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
    dispatch(UserActions.getUserList()).then((result) => {
      const data = result.userList.map((item) => {
        return {
          id: item.account_id,
          status: item.status,
          username: item.username,
          details: "",
        };
      });
      setRelatedUsersList(data);
    });
    //props.history.push("/manager/" + params.id + "/userList");
  };

  useEffect(() => {
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
    dispatch(UserActions.getUserList()).then((result) => {
      const data = result.userList.map((item) => {
        return {
          id: item.account_id,
          status: item.status,
          username: item.username,
          details: "",
        };
      });
      setRelatedUsersList(data);
    });
  }, []);

  const getFullAddress = (road, city_id, district_id, ward_id) => {
    const address = [];
    locations
      .filter((city) => city.code == city_id)
      .map((selectedCity) => {
        address.unshift(selectedCity.name);
        selectedCity.districts
          .filter((district) => district.code == district_id)
          .map((selectedDistrict) => {
            address.unshift(selectedDistrict.name);
            selectedDistrict.wards
              .filter((ward) => ward.code == ward_id)
              .map((selectedWard) => {
                address.unshift(selectedWard.name);
              });
          });
      });
    if (road) address.unshift(road);
    return address.join(", ");
  };

  return (
    <>
      <div className="content row">
        <Sidebar props={props} />
        <div className="col-9">
          <div className="general-information">
            <h1 className="mx-5 mb-5">
              <i className="fas fa-user"></i> Add new user account
            </h1>
            <div className="card card-bg mb-3 text-dark">
              <div className="card-body w-100">
                <h1>
                  Account information : <b className="text-danger"></b>
                </h1>
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
                  />
                </div>
              </div>
            </div>
            <div className="card card-bg mb-3 text-dark">
              <div className="card-body w-100">
                <h1>
                  Basic information: <b className="text-danger"></b>
                </h1>
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
                    style={{ width: "40%" }}
                    value={nationalID}
                    onChange={(e) => {
                      setNationalID(e.target.value);
                    }}
                  />
                  <label
                    className="input-group-text text-form"
                    style={{ width: "10%" }}
                  >
                    Year of birth
                  </label>
                  <input
                    id="P_YearOfBirth"
                    name="P_YearOfBirth"
                    type="number"
                    className="form-control text-form text-location-form"
                    placeholder="Input year of birth"
                    style={{ width: "15%" }}
                    value={yearOfBirth}
                    onChange={(e) => {
                      setYearOfBirth(e.target.value);
                    }}
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
                    style={{ width: "10%" }}
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                    }}
                  >
                    <option className="text-form" value="NO" selected>
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
                  <Formik
                    initialValues={initialValues2}
                    validateOnChange={false}
                  >
                    {(formikProps) => {
                      const { values } = formikProps;
                      setLocation(values);
                      return (
                        <>
                          <label
                            className="input-group-text text-form"
                            style={{ width: "15%" }}
                          >
                            Location
                          </label>
                          <Field
                            className="p-pd-b-iu-input-general-select"
                            as="select"
                            name="city"
                            style={{ width: "30%" }}
                          >
                            <option value="" disabled hidden>
                              Select a city
                            </option>
                            {locations.map((city) => (
                              <option
                                key={city.code}
                                value={city.code}
                                label={city.name}
                              />
                            ))}
                          </Field>
                          —
                          <Field
                            className="p-pd-b-iu-input-general-select"
                            as="select"
                            name="district"
                            style={{ width: "26.5%" }}
                          >
                            <option value="" disabled hidden>
                              Select a district
                            </option>
                            {locations
                              .filter((city) => city.code == values.city)
                              .map((selectedCity) =>
                                selectedCity.districts.map((district) => (
                                  <option
                                    key={district.code}
                                    value={district.code}
                                    label={district.name}
                                  />
                                ))
                              )}
                          </Field>
                          —
                          <Field
                            className="p-pd-b-iu-input-general-select"
                            style={{ width: "26%" }}
                            as="select"
                            name="ward"
                          >
                            <option value="" disabled hidden>
                              Select a ward
                            </option>
                            {locations
                              .filter((city) => city.code == values.city)
                              .map((selectedCity) =>
                                selectedCity.districts
                                  .filter(
                                    (district) =>
                                      district.code == values.district
                                  )
                                  .map((selectedDistrict) =>
                                    selectedDistrict.wards.map((ward) => (
                                      <option
                                        key={ward.code}
                                        value={ward.code}
                                        label={ward.name}
                                      />
                                    ))
                                  )
                              )}
                          </Field>
                          <div className="input-group mb-3">
                            <label
                              className="input-group-text text-form"
                              style={{ width: "15%" }}
                            >
                              Address
                            </label>
                            <Field
                              type="text"
                              name="road"
                              className="p-pd-b-iu-input-general"
                              placeholder={"Input house number and street"}
                              style={{ width: "85%" }}
                            />
                          </div>
                        </>
                      );
                    }}
                  </Formik>
                </div>

                <div className="input-group">
                  <label
                    className="input-group-text text-form"
                    style={{ width: "15%" }}
                  >
                    Treatment location
                  </label>
                  <select
                    className="form-select text-form"
                    id="P_TreatmentLocation"
                    name="P_TreatmentLocation"
                    style={{ width: "85%" }}
                    value={treatmentLocation}
                    onChange={(e) => {
                      setTreatmentLocation(e.target.value);
                    }}
                  >
                    {treatmentLocationList
                      ? treatmentLocationList.map((item, index) => {
                          const isFull = item.current_patients >= item.capacity;
                          if (isFull) {
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
                            if (treatmentLocation === "") {
                              setTreatmentLocation(item.id);
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
              </div>
            </div>
            <div className="card card-bg mb-3 text-dark">
              <div className="card-body w-100">
                <h1>Find related user: </h1>
                <div className="input-group">
                  <label
                    className="input-group-text text-form"
                    style={{ width: "15%" }}
                  >
                    Choose a user
                  </label>

                  <select
                    className="form-select text-form"
                    id="P_RelatedUser"
                    name="P_RelatedUser"
                    style={{ width: "85%" }}
                    value={relatedUser}
                    onChange={(e) => {
                      setRelatedUser(e.target.value);
                    }}
                    disabled={relatedUsersList.length === 0}
                  >
                    <option id={-1} className="text-form" value={null} selected>
                      Select a related user
                    </option>
                    {relatedUsersList
                      ? relatedUsersList.map((item, index) => {
                          return (
                            <option
                              id={index}
                              className="text-form"
                              value={item.id}
                            >
                              {item.username}
                            </option>
                          );
                        })
                      : null}
                  </select>
                </div>
              </div>
            </div>
            <div className="w-100 text-center">
              <button
                className="btn btn-success w-25 text-center"
                onClick={submitUserRegistrationForm}
              >
                Create user
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserRegistrationState
        registerState={registerState}
        setRegisterState={setRegisterState}
        error={error}
        setError={setError}
      />
    </>
  );
};

export default UserRegistration;
