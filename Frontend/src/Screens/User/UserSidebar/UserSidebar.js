import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { UserActions } from "../../../store/actions/UserActions";
import "./UserSidebar.css";

const UserSidebar = (props) => {
  const [userInfo, setUserInfo] = useState(false);
  const [purchase, setPurchase] = useState(false);

  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const redirectPaymentSystem = () => {
    dispatch(
      UserActions.isAuthenticated(JSON.parse(localStorage.getItem("token")), params.user_id)
    ).then((result) => {
      if (result.state) history.push(`/paymentSystem/user/` + result.user_id);
      else history.push(`/paymentSystem/sign-in`);
    });
  };

  const logout = () => {
    dispatch(
      UserActions.logout(JSON.parse(localStorage.getItem("token")))
    ).then((result) => {
      localStorage.setItem("token", null);
      if (result.state) history.push(`/sign-in`);
    });
  };
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <div
          className="title"
          onClick={() => {
            setUserInfo(!userInfo);
          }}
        >
          {userInfo ? (
            <span className="angle-down">
              <i className="fas fa-angle-down"></i>{" "}
            </span>
          ) : (
            <span className="angle-right">
              <i className="fas fa-angle-right"></i>{" "}
            </span>
          )}
          My account
        </div>
        {userInfo ? (
          <ul className="list">
            <li className="list-item">
              <a className="d-block" href={"/user/" + params.user_id}>
                <i className="fa fa-user"></i> Personal info
              </a>
            </li>
            <li className="list-item">
              <a
                className="d-block"
                href={"/user/" + params.user_id + "/resetPassword"}
              >
                <i className="fas fa-lock"></i> Reset password
              </a>
            </li>
            <li className="list-item">
              <a
                className="d-block"
                href={"/user/" + params.user_id + "/managedHistory"}
              >
                <i className="fas fa-history"></i> History being managed
              </a>
            </li>
            <li className="list-item">
              <a
                className="d-block"
                href={"/user/" + params.user_id + "/packagePurchasedHistory"}
              >
                <i className="fas fa-history"></i> Package purchased history
              </a>
            </li>
            <li className="list-item">
              <a
                className="d-block"
                href={"/user/" + params.user_id + "/balance-debt"}
              >
                <i className="fas fa-credit-card"></i> Balance / Debt
              </a>
            </li>
          </ul>
        ) : null}
      </div>

      <div className="sidebar-item">
        <div
          className="title"
          onClick={() => {
            setPurchase(!purchase);
          }}
        >
          {purchase ? (
            <span className="angle-down">
              <i className="fas fa-angle-down"></i>{" "}
            </span>
          ) : (
            <span className="angle-right">
              <i className="fas fa-angle-right"></i>{" "}
            </span>
          )}
          Purchase
        </div>
        {purchase ? (
          <ul className="list">
            <li className="list-item">
              <a
                className="d-block"
                href={"/user/" + params.user_id + "/packages"}
              >
                <i className="fa fa-shopping-cart"></i> Packages
              </a>
            </li>
            <li className="list-item">
              <a
                className="d-block"
                href={"/user/" + params.user_id + "/paymentHistory"}
              >
                <i className="fas fa-history"></i> Payment history
              </a>
            </li>
          </ul>
        ) : null}
      </div>
      <div className="sidebar-item">
        <div className="title">
          <div className="d-block" onClick={redirectPaymentSystem}>
            <i className="fas fa-university"></i> Payment system
          </div>
        </div>
      </div>
      <div className="sidebar-item" onClick={logout}>
        <div className="d-block">
          <div className="title">
            <span className="angle-right">
              <i className="fas fa-angle-right"></i>{" "}
            </span>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
