import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./PaymentTopup.css";
import PaymentSidebar from "../PaymentSidebar/PaymentSidebar";
import { UserActions } from "../../../store/actions/UserActions";

const PaymentTopup = (props) => {
  const [balance, setBalance] = useState(0);
  const [debt, setDebt] = useState(0);

  let [num, setNum] = useState(0);
  let incNum = () => {
    setNum(Number(num) + 1000);
  };
  let decNum = () => {
    setNum(Number(num) - 1000);
  };

  const dispatch = useDispatch();
  const { user_id } = useParams();

  const topupAction = () => {
    if (num === 0) {
      alert("Amount of topup must be greater than zero");
      return false;
    }
    let oldDebt = debt;
    let newDebt = debt;
    let newBalance = balance;
    console.log(newBalance);
    console.log(newDebt);
    if (parseFloat(newDebt) > 0) {
      if (parseFloat(newDebt) >= parseFloat(num)) {
        newDebt = parseFloat(newDebt) - parseFloat(num);
        newBalance = parseFloat(newBalance);
      } else {
        newBalance = parseFloat(newBalance) + parseFloat(num) - parseFloat(newDebt);
        newDebt = 0;
      }
    } else {
      newDebt = 0;
      newBalance = parseFloat(num) + parseFloat(newBalance);
    }
    console.log(num);
    console.log(newBalance);
    console.log(newDebt);
    dispatch(UserActions.topup(user_id, newBalance, newDebt, oldDebt)).then((result) => {
      if (result.status) {
        alert("Topup successfully");
        dispatch(UserActions.getBalanceDebt(user_id)).then((result) => {
          setBalance(result.balance);
          setDebt(result.debt);
        });
      } else {
        alert(result.error);
      }
    });
  };

  useEffect(() => {
    dispatch(UserActions.getBalanceDebt(user_id)).then((result) => {
      setBalance(result.balance);
      setDebt(result.debt);
    });
  }, []);

  return (
    <div className="add-product-wrapper">
      <PaymentSidebar props={props} />
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
                  style={{ width: "80%" }}
                  value={debt}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div className="general-information">
          <div className="card card-bg mb-3 text-dark">
            <div className="card-body w-100">
              <h1>
                Topup <b className="text-danger"></b>
              </h1>
              <div className="input-group-topup">
                <div className="input-group-prepend">
                  <button
                    className="btn-dec btn-dark"
                    type="button"
                    onClick={decNum}
                  >
                    -
                  </button>
                </div>
                <input
                  type="number"
                  className="topup-amount"
                  value={num}
                  onChange={(e) => setNum(e.target.value)}
                  step={1000}
                />
                <div className="input-group-prepend">
                  <button
                    className="btn-inc btn-dark"
                    type="button"
                    onClick={incNum}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="btn-wrapper">
                <button className="btn btn-success" onClick={topupAction}>
                  Topup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTopup;
