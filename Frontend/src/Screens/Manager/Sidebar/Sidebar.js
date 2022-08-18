import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = (props) => {
  const [userManagement, setUserManagement] = useState(false);
  const [productManagement, setProductManagement] = useState(false);
  const [packageManagement, setPackageManagement] = useState(false);
  const [statistics, setStatistics] = useState(false);
  const [paymentManagement, setPaymentManagement] = useState(false);

  const params = useParams();
  const id = params.id;
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <Link to={`/manager/${params.id}`} className="title">
          <i className="fa fa-home" aria-hidden="true"></i>
          <i className="fa fa-home d-none" aria-hidden="true"></i>
          Homepage
        </Link>
      </div>
      <div className="sidebar-item">
        <div
          className="title"
          onClick={() => {
            setUserManagement(!userManagement);
          }}
        >
          {userManagement ? (
            <span className="angle-down">
              <i className="fas fa-angle-down"></i>{" "}
            </span>
          ) : (
            <span className="angle-right">
              <i className="fas fa-angle-right"></i>{" "}
            </span>
          )}
          User management
        </div>
        {userManagement ? (
          <ul className="list">
            <li className="list-item">
              <a
                className="d-block"
                href={"/manager/" + params.id + "/userList"}
              >
                <i className="fa fa-list-ul"></i> User list
              </a>
            </li>
            <li className="list-item">
              <a
                className="d-block"
                href={"/manager/" + params.id + "/addUser"}
              >
                <i className="fas fa-user"></i> Add user
              </a>
            </li>
          </ul>
        ) : null}
      </div>
      <div className="sidebar-item">
        <div
          className="title"
          onClick={() => {
            setProductManagement(!productManagement);
          }}
        >
          {productManagement ? (
            <span className="angle-down">
              <i className="fas fa-angle-down"></i>{" "}
            </span>
          ) : (
            <span className="angle-right">
              <i className="fas fa-angle-right"></i>{" "}
            </span>
          )}
          Product management
        </div>
        {productManagement ? (
          <ul className="list">
            <li className="list-item ">
              <a
                className="d-block"
                href={"/manager/" + params.id + "/productList"}
              >
                <i className="fa fa-list-ul"></i> Product list
              </a>
            </li>
            <li className="list-item">
              <a
                className="d-block"
                href={"/manager/" + params.id + "/addProduct"}
              >
                <i className="fa fa-edit"></i> Add product
              </a>
            </li>
          </ul>
        ) : null}
      </div>
      <div className="sidebar-item">
        <div
          className="title"
          onClick={() => {
            setPackageManagement(!packageManagement);
          }}
        >
          {packageManagement ? (
            <span className="angle-down">
              <i className="fas fa-angle-down"></i>{" "}
            </span>
          ) : (
            <span className="angle-right">
              <i className="fas fa-angle-right"></i>{" "}
            </span>
          )}
          Package management
        </div>
        {packageManagement ? (
          <ul className="list">
            <li className="list-item ">
              <a
                className="d-block"
                href={"/manager/" + params.id + "/packageList"}
              >
                <i className="fa fa-list-ul"></i> Package list
              </a>
            </li>
            <li className="list-item">
              <a
                className="d-block"
                href={"/manager/" + params.id + "/addPackage"}
              >
                <i className="fa fa-edit"></i> Add package
              </a>
            </li>
          </ul>
        ) : null}
      </div>
      <div className="sidebar-item">
        <div
          className="title"
          onClick={() => {
            setStatistics(!statistics);
          }}
        >
          {statistics ? (
            <span className="angle-down">
              <i className="fas fa-angle-down"></i>{" "}
            </span>
          ) : (
            <span className="angle-right">
              <i className="fas fa-angle-right"></i>{" "}
            </span>
          )}
          Statistics
        </div>
        {statistics ? (
          <ul className="list">
            <li className="list-item">
              <a
                className="d-block"
                href={"/manager/" + params.id + "/chartStateByTime"}
              >
                <i className="fa fa-users" aria-hidden="true"></i> People states
                by time
              </a>
            </li>
            <li className="list-item">
              <a
                className="d-block"
                href={"/manager/" + params.id + "/chartStateChange"}
              >
                <i className="fa fa-random"></i> State change
              </a>
            </li>
            <li className="list-item">
              <a
                className="d-block"
                href={"/manager/" + params.id + "/chartPackage"}
              >
                <i className="fa fa-shopping-cart"></i> Package consumption
              </a>
            </li>
            <li className="list-item">
              <a
                className="d-block"
                href={"/manager/" + params.id + "/chartProduct"}
              >
                <i className="fa fa-shopping-basket"></i> Product consumption
              </a>
            </li>
            <li className="list-item">
              <a
                className="d-block"
                href={"/manager/" + params.id + "/chartBalanceDeptPayment"}
              >
                <i className="fa fa-credit-card"></i> Debt and payment
              </a>
            </li>
          </ul>
        ) : null}
      </div>
      <div className="sidebar-item">
        <div
          className="title"
          onClick={() => {
            setPaymentManagement(!paymentManagement);
          }}
        >
          {paymentManagement ? (
            <span className="angle-down">
              <i className="fas fa-angle-down"></i>{" "}
            </span>
          ) : (
            <span className="angle-right">
              <i className="fas fa-angle-right"></i>{" "}
            </span>
          )}
          Payment management
        </div>
        {paymentManagement ? (
          <ul className="list">
            <li className="list-item">
              <a
                className="d-block"
                href={"/manager/" + params.id + "/changeMinPayment"}
              >
                <i className="fa fa-list-alt" aria-hidden="true"></i> Change
                minimum payment
              </a>
            </li>
            <li className="list-item">
              <a
                className="d-block"
                href={"/manager/" + params.id + "/sendPaymentNotification"}
              >
                <i
                  className="fa fa-exclamation-triangle"
                  aria-hidden="true"
                ></i>{" "}
                Browse users and send payment notification
              </a>
            </li>
          </ul>
        ) : null}
      </div>
      <div className="sidebar-item">
        <a className="d-block" href={"/sign-in"}>
          <div className="title">
            <span className="angle-right">
              <i className="fas fa-angle-right"></i>{" "}
            </span>
            Logout
          </div>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
