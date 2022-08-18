import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./SignUp.css";
import { UserActions } from "../../store/actions/UserActions";
import Logo from "../../assets/logo.png";
import SignUpPageSideBackground from "../../assets/signup-page-side-background.png";
import {
  faUser,
  faLock,
  faPenSquare,
} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RegistrationState from "./RegistrationState/RegistrationState";

const SignUpPage = ({ signup, isAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidName, setInvalidName] = useState(false);

  const [registerState, setRegisterState] = useState(false);
  const [error, setError] = useState("");

  //const loggingIn = useSelector(state => state.authentication.loggingIn);
  const dispatch = useDispatch();
  const history = useHistory();

  const checkUsername = () => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (specialChars.test(username)) {
      setInvalidUsername("Username must not contain special characters");
      return false;
    } else if (username === "") {
      setInvalidUsername("Username must not be empty");
      return false;
    } else {
      setInvalidUsername(false);
      return true;
    }
  };

  const checkName = () => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (specialChars.test(name)) {
      setInvalidName("Your name must not contain special characters");
      return false;
    } else if (name === "") {
      setInvalidName("Your name must not be empty");
      return false;
    } else {
      setInvalidName(false);
      return true;
    }
  };

  const checkPassword = () => {
    if (password === "") {
      setInvalidPassword("Password must not be empty");
      return false;
    } else {
      setInvalidPassword(false);
      return true;
    }
  };

  const submitSignUpForm = () => {
    var isValidUsername = checkUsername(username);
    var isValidPassword = checkPassword(password);
    var isValidName = checkName(name);
    if (!isValidUsername || !isValidPassword || !isValidName) return false;
    dispatch(UserActions.signUpAdmin(username, password, name)).then((result) => {
      console.log(result)
      if(!result.registerState){
        setRegisterState(true);
        setError(result.error);
      }
      else{
        setRegisterState(true);
        setError("");
      }
    });
  };

  return (
    <>
      <div className="signup-page-wrapper">
        <div className="s-p-header-wrapper">
          <img className="h-logo" src={Logo} alt="" />
          <div className="h-text">Covid Management</div>
        </div>
        <div className="signup-wrapper">
          <div className="signup-container">
            <div className="signup-content">
              <div className="s-main-text">
                Administrator of Covid Management?
              </div>
              <div className="s-sub-text">
                Sign up to start managing your system
              </div>
              <div className="s-username-wrapper">
                <div className="s-u-text">Username</div>
                <FontAwesomeIcon className="s-u-icon" icon={faUser} />
                <input
                  className={`s-u-input ${
                    invalidUsername === false
                      ? "s-u-input-valid"
                      : "s-u-input-invalid"
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
                  <div className="s-u-invalid">{invalidUsername}</div>
                )}
              </div>

              <div className="s-username-wrapper">
                <div className="s-u-text">Fullname</div>
                <FontAwesomeIcon className="s-u-icon" icon={faPenSquare} />
                <input
                  className={`s-u-input ${
                    invalidName === false
                      ? "s-u-input-valid"
                      : "s-u-input-invalid"
                  }`}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  onBlur={(e) => checkName(e.target.value)}
                  type="text"
                  placeholder="Type your fullname"
                  maxLength={50}
                />
                {invalidName && (
                  <div className="s-u-invalid">{invalidName}</div>
                )}
              </div>

              <div className="s-password-wrapper">
                <div className="s-p-text">Password</div>
                <FontAwesomeIcon className="s-p-icon" icon={faLock} />
                <input
                  className={`s-p-input ${
                    invalidPassword === false
                      ? "s-p-input-valid"
                      : "s-p-input-invalid"
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
                      submitSignUpForm();
                    }
                  }}
                />
                {invalidPassword && (
                  <div className="s-p-invalid">{invalidPassword}</div>
                )}
              </div>
              <button
                className="s-signup-button"
                onClick={submitSignUpForm}
                disabled={invalidPassword || invalidUsername || invalidName ? true : false}
              >
                Sign up
              </button>
            </div>
          </div>
          <img
            className="s-side-background"
            src={SignUpPageSideBackground}
            alt=""
          />
        </div>
      </div>
      <RegistrationState
      registerState={registerState}
      setRegisterState={setRegisterState}
      error={error}
      setError={setError}
      history={history}
      />
    </>
  );
};

export default SignUpPage;
