import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Create.css";
import { UserActions } from "../../../store/actions/UserActions";
import CreateState from "./CreateState/CreateState";

const Create = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [createState, setCreateState] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const submitSignUpManagerForm = () => {
    dispatch(UserActions.signUpManager(username, password)).then((result) => {
      console.log(result);
      if (!result.registerState) {
        setCreateState(true);
        setError(result.error);
      } else {
        setCreateState(true);
        setError("");
      }
    });
  };
  return (
    <>
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
              Create
            </div>
            <ul className="list">
              <li className="list-item">
                <Link to="/admin" className="d-block">
                  <i className="fas fa-home"></i> Home
                </Link>
              </li>
              <li className="list-item active">
                <Link to="/admin/create" className="d-block">
                  <i className="fas fa-user"></i> Create new manager
                </Link>
              </li>
              <li className="list-item">
                <Link to="/admin/manage" className="d-block">
                  <i className="fas fa-cog"></i> Manager management
                </Link>
              </li>
              <li className="list-item">
                <Link to="/admin/treatment" className="d-block">
                  <i className="fas fa-hospital"></i> Treatment location
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
            <div className="create-content-wrapper">
              <div className="col-12 mt-5">
                <div className="create-account">
                  <div className="input">
                    <div className="card info">
                      <div className="card-header bg text-white m-auto w-100">
                        Manager Registration
                      </div>
                      <div className="mt-3">
                        <div className="input-group">
                          <input
                            type="text"
                            name="username"
                            className="form-control"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={(e) => {
                              setUsername(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className=" mt-3">
                        <div className="input-group">
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className=" mt-3">
                        <button
                          className="s-signup-button"
                          onClick={submitSignUpManagerForm}
                        >
                          Create
                        </button>
                      </div>
                      <div
                        className="alert alert-{{color}} col-auto p-2 m-3 flash"
                        role="alert"
                      ></div>
                      <div className="second">
                        <img
                          src="https://img.lovepik.com/photo/45000/8896.jpg_wh300.jpg"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="img">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/001/962/525/original/coronavirus-covid-19-vaccine-day-flat-design-illustration-male-doctor-and-female-doctor-ready-to-inject-vaccines-free-vector.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateState
        createStatus={createState}
        setCreateStatus={setCreateState}
        error={error}
        setError={setError}
      />
    </>
  );
};

export default Create;
