import React from "react";
import "./PaymentLoginState.css";
import { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";

const PaymentLoginState = (props) => {
  const { loginStatus, setLoginStatus, error, setError } = props;
  const PaymentLoginStateModalRef = useRef();
  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: loginStatus ? 1 : 0,
    transform: loginStatus ? `translateY(0%)` : `translateY(-100%)`,
  });
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && loginStatus) {
        setLoginStatus(false);
      }
    },
    [setLoginStatus, loginStatus]
  );
  const closeModal = (e) => {
    if (PaymentLoginStateModalRef.current === e.target) {
      setLoginStatus(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);
  return (
    <>
      {loginStatus ? (
        <div
          className="l-m-background"
          onClick={closeModal}
          ref={PaymentLoginStateModalRef}
        >
          <animated.div style={animation}>
            <div className="l-m-wrapper">
              <div className="l-m-content">
                {error === "" ? (
                  null
                ) : (
                  <>
                    <h1 style={{ color: "red" }}>
                      Login unsuccessfully
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

export default PaymentLoginState;
