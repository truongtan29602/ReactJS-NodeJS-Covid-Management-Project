import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./TreatmentLocationCreate.css";
import { Link } from "react-router-dom";
import { UserActions } from "../../../store/actions/UserActions";

const TreatmentLocationCreate = () => {
  const [name, setName] = useState();
  const [capacity, setCapacity] = useState();
  const [currentPatients, setCurrentPatients] = useState();

  const dispatch = useDispatch();

  const submitNewTreatmentLocation = () => {
    dispatch(
      UserActions.addTreatmentLocation(name, capacity, currentPatients)
    ).then((result) => {
      if (result.addLocationState) {
        alert("New location was added successfully");
      } else {
        alert("Error: " + result.error);
      }
    });
  };

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
          <div className="row">
            <div className="col-1">
              <a href="/admin/treatment" className="btn btn-danger">
                Back
              </a>
            </div>
            <div className="col-8 mt-5">
              <div className="input">
                <div className="card info">
                  <div className="card-header bg text-white m-auto w-100">
                    Add new treatment location
                  </div>
                  <div className="input-treatment">
                    <div className="title1 mt-3 title">Location name</div>
                    <div className="mt-3 item1">
                      <div className="input-group">
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          id="inlineFormInputGroup"
                          placeholder="Name"
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="title2 mt-3 title">Capacity</div>
                    <div className=" mt-3 item2">
                      <div className="input-group">
                        <input
                          type="number"
                          name="capacity"
                          className="form-control"
                          id="inlineFormInputGroup"
                          placeholder="Capacity"
                          onChange={(e) => {
                            setCapacity(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="title3 mt-3 title">Current quantity</div>
                    <div className=" mt-3 item3">
                      <div className="input-group">
                        <input
                          type="number"
                          name="current"
                          className="form-control"
                          id="inlineFormInputGroup"
                          placeholder="Current quantity"
                          onChange={(e) => {
                            setCurrentPatients(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className=" mt-3 btn-add">
                    <button onClick={submitNewTreatmentLocation}>Add</button>
                  </div>
                  <div
                    className="alert alert-{{color}} col-auto p-2 m-3 flash"
                    role="alert"
                  ></div>

                  <div className="line"></div>

                  <div className="second">
                    <img
                      src="https://medcitynews.com/uploads/2021/08/hospital-clinic-tech-concept-600x300.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentLocationCreate;
