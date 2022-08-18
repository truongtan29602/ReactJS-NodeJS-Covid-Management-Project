import React from "react";
import "./UserCreatePassword.css";
import { useState } from "react";
import { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import { useDispatch } from "react-redux";
import { UserActions } from "../../../store/actions/UserActions";
import { faLock } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserCreatePassword = (props) => {
  const { userCreatePasswordStatus, setUserCreatePasswordStatus, username } =
    props;
  const [password, setPassword] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);
  const userCreatePasswordStateModalRef = useRef();

  const dispatch = useDispatch();
  const checkPassword = () => {
    if (password === "") {
      setInvalidPassword("Password must not be empty");
      return true;
    } else {
      setInvalidPassword(false);
      return false;
    }
  };

  const createPassword = () => {
    if(checkPassword(password)) return;
    dispatch(UserActions.userCreatePassword(username, password)).then(
      (result) => {
        alert(result.message);
        setUserCreatePasswordStatus(false);
      }
    );
  };

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: userCreatePasswordStatus ? 1 : 0,
    transform: userCreatePasswordStatus
      ? `translateY(0%)`
      : `translateY(-100%)`,
  });
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && userCreatePasswordStatus) {
        setUserCreatePasswordStatus(false);
      }
    },
    [setUserCreatePasswordStatus, userCreatePasswordStatus]
  );
  const closeModal = (e) => {
    if (userCreatePasswordStateModalRef.current === e.target) {
      setUserCreatePasswordStatus(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);
  return (
    <>
      {userCreatePasswordStatus ? (
        <div
          className="u-c-p-background"
          onClick={closeModal}
          ref={userCreatePasswordStateModalRef}
        >
          <animated.div style={animation}>
            <div className="u-c-p-wrapper">
              <div className="u-c-p-content">
                <div className="u-c-password-wrapper">
                  <div className="u-c-p-text">Password</div>
                  <FontAwesomeIcon className="u-c-p-icon" icon={faLock} />
                  <input
                    className={`u-c-p-input ${
                      invalidPassword === false
                        ? "u-c-p-input-valid"
                        : "u-c-p-input-invalid"
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
                        createPassword();
                      }
                    }}
                  />
                  {invalidPassword && (
                    <div className="u-c-p-invalid">{invalidPassword}</div>
                  )}
                </div>
                <button
                  className="u-c-p-button"
                  onClick={createPassword}
                  disabled={invalidPassword ? true : false}
                >
                  Create
                </button>
              </div>
            </div>
          </animated.div>
        </div>
      ) : null}
    </>
  );
};

export default UserCreatePassword;
