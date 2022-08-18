import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./SignIn.css";
import { UserActions } from "../../store/actions/UserActions";
import Logo from "../../assets/logo.png";
import SignInSideBackground from "../../assets/signup-page-side-background.png";
import { faUser, faLock } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { store } from "../../store";
import LoginState from "./LoginState/LoginState";
import UserCreatePassword from "./UserCreatePassword/UserCreatePassword";

const SignIn = ({ login, isAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const [loginStatus, setLoginStatus] = useState(false);
  const [userCreatePasswordStatus, setUserCreatePasswordStatus] =
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

  const submitLoginForm = () => {
    checkPassword(password);
    checkUsername(username);

    dispatch(UserActions.login(username, password)).then((result) => {
      if (result.loginState) {
        if (result.profile.status === "lock") {
          setLoginStatus(true);
          setError("This account is locked");
          store.dispatch({
            type: "USERS_LOGIN_FAIL",
            payload: "This account is locked",
          });
        } else {
          store.dispatch({
            type: "USERS_LOGIN_SUCCESS",
            payload: result.profile,
          });
          if (result.profile.role === "admin") history.push("/admin");
          if (result.profile.role === "manager")
            history.push(`/manager/${result.profile.account_id}`);
          if (result.profile.role === "user")
            history.push(`/user/${result.profile.account_id}`);
        }
      } else {
        if ((result.err.account_id !== -1)) {
          setUserCreatePasswordStatus(true);
        } else {
          setLoginStatus(true);
          setError(result.err.message);
          store.dispatch({
            type: "USERS_LOGIN_FAIL",
            payload: result.err,
          });
        }
      }
    });
  };

  return (
    <>
      <div className="login-page-wrapper">
        <div className="l-p-header-wrapper">
          <img className="h-logo" src={Logo} alt="" />
          <div className="h-text">Covid Management</div>
        </div>
        <div className="login-wrapper">
          <div className="login-container">
            <div className="login-content">
              <div className="l-main-text">Covid Management</div>
              <div className="l-sub-text">
                Sign in to start using our services
              </div>
              <div className="l-username-wrapper">
                <div className="l-u-text">Username</div>
                <FontAwesomeIcon className="l-u-icon" icon={faUser} />
                <input
                  className={`l-u-input ${
                    invalidUsername === false
                      ? "l-u-input-valid"
                      : "l-u-input-invalid"
                  }`}
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  onBlur={(e) => checkUsername(e.target.value)}
                  type="text"
                  placeholder="Type your username"
                  maxLength={50}
                />
                {invalidUsername && (
                  <div className="l-u-invalid">{invalidUsername}</div>
                )}
              </div>
              <div className="l-password-wrapper">
                <div className="l-p-text">Password</div>
                <FontAwesomeIcon className="l-p-icon" icon={faLock} />
                <input
                  className={`l-p-input ${
                    invalidPassword === false
                      ? "l-p-input-valid"
                      : "l-p-input-invalid"
                  }`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onBlur={(e) => checkPassword(e.target.value)}
                  type="password"
                  placeholder="Type your password"
                  maxLength={50}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      submitLoginForm();
                    }
                  }}
                />
                {invalidPassword && (
                  <div className="l-p-invalid">{invalidPassword}</div>
                )}
              </div>
              <button
                className="l-login-button"
                onClick={submitLoginForm}
                disabled={invalidPassword || invalidUsername ? true : false}
              >
                Sign in
              </button>
            </div>
          </div>
          <img
            className="l-side-background"
            src={SignInSideBackground}
            alt=""
          />
        </div>
      </div>
      <LoginState
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        error={error}
        setError={setError}
      />
      <UserCreatePassword
        userCreatePasswordStatus={userCreatePasswordStatus}
        setUserCreatePasswordStatus={setUserCreatePasswordStatus}
        username={username}
      />
    </>
  );
};

export default SignIn;
