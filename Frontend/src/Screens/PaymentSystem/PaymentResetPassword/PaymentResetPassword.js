import React from "react";
import { useState} from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./PaymentResetPassword.css";
import PaymentSidebar from "../PaymentSidebar/PaymentSidebar";
import { UserActions } from "../../../store/actions/UserActions";
import PaymentResetPasswordState from "./PaymentResetPasswordState/PaymentResetPasswordState";

const PaymentResetPassword = (props) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [resetState, setResetState] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const { user_id } = useParams();

  const PaymentResetPassword = () => {
    if (currentPassword === "" || newPassword === "" || reNewPassword === "") {
      setResetState(true);
      setError("All fields are required");
      return;
    }
    if (!(newPassword === reNewPassword)) {
      setResetState(true);
      setError("New password and confirm password does not match");
      return;
    }
    dispatch(
      UserActions.paymentResetPassword(user_id, currentPassword, newPassword)
    ).then((result) => {
      if (result.error) {
        setResetState(true);
        setError(result.error);
        return;
      }
      else{
        setResetState(true);
        setError("");
        return;
      }
    });
  };

  return (
    <div className="add-product-wrapper">
      <PaymentSidebar props={props} />
      <div className="col-9">
        <div className="general-information">
          <div className="card card-bg mb-3 text-dark">
            <div className="card-body w-100">
              <h1>
                Reset password <b className="text-danger"></b>
              </h1>
              <div className="input-group mb-3">
                <label
                  className="input-group-text text-form"
                  style={{ width: "20%" }}
                >
                  Current password
                </label>
                <input
                  type="password"
                  className="form-control text-form text-location-form"
                  placeholder="Enter current password"
                  style={{ width: "80%" }}
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <label
                  className="input-group-text text-form"
                  style={{ width: "20%" }}
                >
                  New password
                </label>
                <input
                  type="password"
                  className="form-control text-form text-location-form"
                  placeholder="Enter new password"
                  style={{ width: "80%" }}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <label
                  className="input-group-text text-form"
                  style={{ width: "20%" }}
                >
                  Re-enter new password
                </label>
                <input
                  type="password"
                  className="form-control text-form text-location-form"
                  placeholder="Re-enter new password"
                  style={{ width: "80%" }}
                  value={reNewPassword}
                  onChange={(e) => {
                    setReNewPassword(e.target.value);
                  }}
                />
              </div>
              <div className="w-100 text-center">
                <button
                  className="btn btn-success w-25 text-center"
                  onClick={PaymentResetPassword}
                >
                  Reset password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PaymentResetPasswordState
        resetState={resetState}
        setResetState={setResetState}
        error={error}
        setError={setError}
      />
    </div>
  );
};

export default PaymentResetPassword;
