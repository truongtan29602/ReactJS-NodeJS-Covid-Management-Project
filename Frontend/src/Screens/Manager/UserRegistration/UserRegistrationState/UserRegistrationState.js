import React from "react";
import "./UserRegistrationState.css";
import { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";

const UserRegistrationState = (props) => {
  const { registerState, setRegisterState, error, setError } = props;
  const registrationStateModalRef = useRef();
  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: registerState ? 1 : 0,
    transform: registerState ? `translateY(0%)` : `translateY(-100%)`,
  });
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && registerState) {
        setRegisterState(false);
      }
    },
    [setRegisterState, registerState]
  );
  const closeModal = (e) => {
    if (registrationStateModalRef.current === e.target) {
      setRegisterState(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);
  return (
    <>
      {registerState ? (
        <div
          className="r-m-background"
          onClick={closeModal}
          ref={registrationStateModalRef}
        >
          <animated.div style={animation}>
            <div className="r-m-wrapper">
              <div className="r-m-content">
                {error === "" ? (
                  <>
                    <h1 style={{ color: "green" }}>
                      Account registered successfully
                    </h1>
                  </>
                ) : (
                  <>
                    <h1 style={{ color: "red" }}>
                      Account registered unsuccessfully
                    </h1>
                    <p>{error}</p>
                  </>
                )}
              </div>
            </div>
          </animated.div>
        </div>
      ) : null}
    </>
  );
};

export default UserRegistrationState;
