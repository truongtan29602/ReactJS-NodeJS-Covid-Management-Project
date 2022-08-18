import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./TreatmentLocationEdit.css";
import { Link } from "react-router-dom";
import { UserActions } from "../../../store/actions/UserActions";

const TreatmentLocationEdit = () => {
  const params = useParams();

  const [name, setName] = useState();
  const [capacity, setCapacity] = useState();
  const [currentPatients, setCurrentPatients] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    //call api
    dispatch(UserActions.getTreatmentLocationByID(params.id)).then((result) => {
      console.log(result);
      setName(result.treatmentLocation.name);
      setCapacity(result.treatmentLocation.capacity);
      setCurrentPatients(result.treatmentLocation.current_patients_number);
    });
  }, []);

  const submitUpdateTreatmentLocation = () => {
    dispatch(
      UserActions.updateTreatmentLocation(
        params.id,
        name,
        capacity,
        currentPatients
      )
    ).then((result) => {
      dispatch(UserActions.getTreatmentLocationByID(params.id)).then(
        (result) => {
          console.log(result);
          setName(result.treatmentLocation.name);
          setCapacity(result.treatmentLocation.capacity);
          setCurrentPatients(result.treatmentLocation.current_patients_number);
        }
      );
      alert(result.message);
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
          <a href="/admin/treatment" className="btn btn-danger">
            back
          </a>
          <div className="input">
            <div className="card info">
              <div className="card-header bg text-white m-auto w-100">
                Edit Treatment Location
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
                      value={name}
                      placeholder={name}
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
                      placeholder={capacity}
                      value={capacity}
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
                      placeholder={currentPatients}
                      value={currentPatients}
                      onChange={(e) => {
                        setCurrentPatients(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className=" mt-3 btn-add">
                <button onClick={submitUpdateTreatmentLocation}>Update</button>
              </div>
              <div
                className="alert alert-{{color}} col-auto p-2 m-3 flash"
                role="alert"
              ></div>
              <div className="line"></div>

              <div className="second">
                <img
                  src="https://www.mobihealthnews.com/sites/default/files/connected%20health%20ecosystem.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentLocationEdit;
