import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./MinimumPaymentLimit.css";
import Sidebar from "../Sidebar/Sidebar";
import { UserActions } from "../../../store/actions/UserActions";

const MinimumPaymentLimit = (props) => {
  const [minimumPaymentLimit, setMinimumPaymentLimit] = useState();
  const [newMinimumPaymentLimit, setNewMinimumPaymentLimit] = useState(0);

  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(UserActions.getMinimumPaymentLimit()).then((result) => {
      setMinimumPaymentLimit(result.minimum_payment_limit.toFixed(2));
    });
  }, []);

  const updateMinimumPaymentLimit = () => {
    if (newMinimumPaymentLimit <= 0) {
      alert("Minimum payment limit must be greater than zero.");
      return;
    }
    dispatch(
      UserActions.updateMinimumPaymentLimit(
        id,
        minimumPaymentLimit,
        newMinimumPaymentLimit
      )
    ).then((result) => {
      alert(result.message);
      dispatch(UserActions.getMinimumPaymentLimit()).then((result) => {
        setMinimumPaymentLimit(result.minimum_payment_limit.toFixed(2));
      });
    });
  };

  return (
    <div className="add-product-wrapper">
      <Sidebar props={props} />
      <div className="col-9">
        <h1 style={{ textAlign: "center" }}>Current minimum payment limit</h1>
        <div className="general-information">
          <div className="container">
            <div className="row no-gutter">
              <div className="input-group mb-3">
                <label
                  className="input-group-text text-form"
                  style={{ width: "20%" }}
                >
                  Minimum payment limit
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control text-form text-location-form"
                  style={{ width: "80%" }}
                  value={minimumPaymentLimit}
                  onChange={(e) => {
                    setMinimumPaymentLimit(e.target.value);
                  }}
                  readOnly
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="card card-bg mb-3 text-dark">
            <div className="card-body w-100">
              <h1>
                Update minimum payment limit<b className="text-danger"></b>
              </h1>
              <div className="input-group mb-3">
                <label
                  className="input-group-text text-form"
                  style={{ width: "20%" }}
                >
                  New minimum
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  className="form-control text-form text-location-form"
                  placeholder="Input new minimum payment limit"
                  style={{ width: "80%" }}
                  value={newMinimumPaymentLimit}
                  onChange={(e) => {
                    setNewMinimumPaymentLimit(e.target.value);
                  }}
                />
              </div>

              <div className="w-100 text-center">
                <button
                  className="btn btn-success w-20 text-center"
                  onClick={updateMinimumPaymentLimit}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimumPaymentLimit;
