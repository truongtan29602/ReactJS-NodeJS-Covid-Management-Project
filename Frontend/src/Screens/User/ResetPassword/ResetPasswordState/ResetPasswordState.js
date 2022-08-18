import React from "react";
import "./ResetPasswordState.css";
import { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";

const ResetPasswordState = (props) => {
  const { resetState, setResetState, error, setError } = props;
  const resetPasswordStateModalRef = useRef();
  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: resetState ? 1 : 0,
    transform: resetState ? `translateY(0%)` : `translateY(-100%)`,
  });
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && resetState) {
        setResetState(false);
      }
    },
    [setResetState, resetState]
  );
  const closeModal = (e) => {
    if (resetPasswordStateModalRef.current === e.target) {
      setResetState(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);
  return (
    <>
      {resetState ? (
        <div
          className="r-m-background"
          onClick={closeModal}
          ref={resetPasswordStateModalRef}
        >
          <animated.div style={animation}>
            <div className="r-m-wrapper">
              <div className="r-m-content">
                {error === "" ? (
                  <>
                    <h1 style={{ color: "green" }}>
                      Password reset successfully
                    </h1>
                  </>
                ) : (
                  <>
                    <h1 style={{ color: "red" }}>
                      Password reset unsuccessfully
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

export default ResetPasswordState;
