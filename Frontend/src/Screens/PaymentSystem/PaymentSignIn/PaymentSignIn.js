import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserActions } from "../../../store/actions/UserActions";
import "./PaymentSignIn.css";
import logo from "../../../assets/favicon.ico";
import UserPaymentCreatePassword from "./UserPaymentCreatePassword/UserPaymentCreatePassword";
import PaymentLoginState from "./PaymentLoginState/PaymentLoginState";

const PaymentSignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalidUsername, setInvalidUsername] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState(false);
  const [UserPaymentCreatePasswordStatus, setUserPaymentCreatePasswordStatus] =
    useState(false);
  const [error, setError] = useState("");

  //const loggingIn = useSelector(state => state.authentication.loggingIn);
  const dispatch = useDispatch();
  const history = useHistory();

  const checkUsername = () => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (specialChars.test(username)) {
      setInvalidUsername("Username must not contain special characters");
    } else if (username === "") {
      setInvalidUsername("Username must not be empty");
    } else {
      setInvalidUsername(false);
    }
  };

  const checkPassword = () => {
    if (password === "") {
      setInvalidPassword("Password must not be empty");
    } else {
      setInvalidPassword(false);
    }
  };

  const submitPaymentLoginForm = () => {
    checkPassword(password);
    checkUsername(username);

    dispatch(UserActions.loginPayment(username, password)).then((result) => {
      if (result.loginState) {
        history.push(`/paymentSystem/user/${result.profile.account_id}`);
      } else {
        if ((result.err.message = "First time user login")) {
          setUserPaymentCreatePasswordStatus(true);
        } else {
          setLoginStatus(true);
          setError(result.err.message);
        }
      }
    });
  };

  return (
    <>
      <div className="main-login">
        <div className="login-contain">
          <div className="left-side">
            <div className="img-class">
              <img src={logo} id="img-id" alt="" />
            </div>

            <div className="p-l-wrapper">
              <label>Username</label>
              <input
                className={`${
                  invalidUsername === ""
                    ? ""
                    : invalidUsername === false
                    ? "valid"
                    : "invalid"
                }`}
                placeholder="Enter your username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                onBlur={(e) => checkUsername(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    submitPaymentLoginForm();
                  }
                }}
              />
              {invalidUsername && (
                <div className="p-l-u-invalid">{invalidUsername}</div>
              )}
              <label>Password</label>
              <input
                className={`${
                  invalidPassword === ""
                    ? ""
                    : invalidPassword === false
                    ? "valid"
                    : "invalid"
                }`}
                placeholder="Enter password"
                type="password"
                autoComplete="false"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onBlur={(e) => checkPassword(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    submitPaymentLoginForm();
                  }
                }}
              />
              {invalidPassword && (
                <div className="p-l-p-invalid">{invalidPassword}</div>
              )}
              <div className="btn-wrapper">
                <button
                  type="submit"
                  id="sub_butt"
                  onClick={submitPaymentLoginForm}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
          <div className="right-side">
            <div className="welcomeNote">
              <h3>Welcome to Covid Management Topup system!</h3>
            </div>
            <div className="welcomeImg">
              <img
                src="https://img.freepik.com/premium-vector/flat-design-top-up-electronic-wallet-concept-illustration-websites-landing-pages-mobile-applications-posters-banners_108061-894.jpg?w=2000"
                id="wel-img-id"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <PaymentLoginState
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        error={error}
        setError={setError}
      />
      <UserPaymentCreatePassword
        UserPaymentCreatePasswordStatus={UserPaymentCreatePasswordStatus}
        setUserPaymentCreatePasswordStatus={setUserPaymentCreatePasswordStatus}
        username={username}
      />
    </>
  );
};

export default PaymentSignIn;
