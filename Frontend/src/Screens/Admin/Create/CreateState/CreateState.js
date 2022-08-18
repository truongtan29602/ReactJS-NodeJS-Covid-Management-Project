import React from "react";
import "./CreateState.css";
import { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";

const CreateState = (props) => {
  const { createStatus, setCreateStatus, error, setError } = props;
  const createStateModalRef = useRef();
  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: createStatus ? 1 : 0,
    transform: createStatus ? `translateY(0%)` : `translateY(-100%)`,
  });
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && createStatus) {
        setCreateStatus(false);
      }
    },
    [setCreateStatus, createStatus]
  );
  const closeModal = (e) => {
    if (createStateModalRef.current === e.target) {
      setCreateStatus(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);
  return (
    <>
      {createStatus ? (
        <div
          className="c-m-background"
          onClick={closeModal}
          ref={createStateModalRef}
        >
          <animated.div style={animation}>
            <div className="c-m-wrapper">
              <div className="c-m-content">
                {error === "" ? (
                  <>
                    <h1 style={{color: "green"}}>Account registered successfully</h1>
                  </>
                ) : (
                  <>
                    <h1 style={{color: "red"}}>Account registered unsuccessfully</h1>
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

export default CreateState;
