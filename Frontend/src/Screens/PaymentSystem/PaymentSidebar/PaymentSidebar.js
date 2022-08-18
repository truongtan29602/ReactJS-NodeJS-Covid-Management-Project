import React from "react";
import { useParams } from "react-router-dom";
import "./PaymentSidebar.css";

const PaymentSidebar = (props) => {
  const params = useParams();
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <a className="d-block" href={"/paymentSystem/user/" + params.user_id}>
          <div className="title">
            <span className="angle-right">
              <i className="fas fa-angle-right"></i>{" "}
            </span>
            Topup
          </div>
        </a>
      </div>
      <div className="sidebar-item">
        <a
          className="d-block"
          href={"/paymentSystem/user/" + params.user_id + "/resetPassword"}
        >
          <div className="title">
            <span className="angle-right">
              <i className="fas fa-angle-right"></i>{" "}
            </span>
            Reset password
          </div>
        </a>
      </div>
      <div className="sidebar-item">
        <a className="d-block" href={"/paymentSystem/sign-in"}>
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

export default PaymentSidebar;
