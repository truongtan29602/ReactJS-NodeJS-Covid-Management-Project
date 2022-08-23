import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./Balance.css";
import UserSidebar from "../UserSidebar/UserSidebar";
import { UserActions } from "../../../store/actions/UserActions";

const Balance = (props) => {
  const [balance, setBalance] = useState(0);
  const [debt, setDebt] = useState(0);
  const [notification, setNotification] = useState({});

  const dispatch = useDispatch();
  const { user_id } = useParams();
  const history = useHistory();

  const redirectPaymentSystem = () => {
    dispatch(
      UserActions.isAuthenticated(JSON.parse(localStorage.getItem("token")), user_id)
    ).then((result) => {
      if (result.state)
        history.push(`/paymentSystem/user/` + result.user_id);
      else history.push(`/paymentSystem/sign-in`);
    });
  };

  useEffect(() => {
    dispatch(UserActions.getBalanceDebt(user_id)).then((result) => {
      setBalance(result.balance);
      setDebt(result.debt);
      setNotification({
        total_debt: result.notification,
        date: result.notification_date,
      });
    });
  }, []);

  return (
    <div className="add-product-wrapper">
      <UserSidebar props={props} />
      <div className="col-9">
        <div className="general-information">
          <div className="card card-bg mb-3 text-dark">
            <div className="card-body w-100">
              <h1>
                My balance <b className="text-danger"></b>
              </h1>
              <div className="input-group mb-3">
                <label
                  className="input-group-text text-form"
                  style={{ width: "20%" }}
                >
                  <i className="fa fa-plus-circle"></i>&nbsp; My balance
                </label>
                <input
                  type="text"
                  step="0.1"
                  className="form-control text-form text-location-form"
                  placeholder=""
                  style={{ width: "80%" }}
                  value={balance}
                  disabled
                />
              </div>
              <div className="input-group mb-3">
                <label
                  className="input-group-text text-form"
                  style={{ width: "20%" }}
                >
                  <i className="fa fa-minus-circle"></i>&nbsp; My debt
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="form-control text-form text-location-form"
                  placeholder=""
                  style={{ width: "80%" }}
                  value={debt}
                  disabled
                />
              </div>
              <div className="w-100 text-center">
                  <button className="btn btn-success w-25 text-center" onClick={redirectPaymentSystem}>
                    Top-up
                  </button>
              </div>
            </div>
          </div>
        </div>
        {notification.total_debt ? (
          <>
            <div className="general-information">
              <div className="card card-bg mb-3 text-dark">
                <div className="card-body w-100">
                  <h1>
                    Notification <b className="text-danger"></b>
                  </h1>
                  <div className="notification-wrapper">
                    <span className="notification-date">
                      {notification.date}&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;
                    </span>
                    Please finish your total debt of {notification.total_debt}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Balance;
