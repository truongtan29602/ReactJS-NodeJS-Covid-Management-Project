import React from "react";
import "./AddPackageState.css";
import { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";

const AddPackageState = (props) => {
  const { addPackageState, setAddPackageState, error, setError } = props;
  const addPackageStateModalRef = useRef();
  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: addPackageState ? 1 : 0,
    transform: addPackageState ? `translateY(0%)` : `translateY(-100%)`,
  });
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && addPackageState) {
        setAddPackageState(false);
      }
    },
    [setAddPackageState, addPackageState]
  );
  const closeModal = (e) => {
    if (addPackageStateModalRef.current === e.target) {
      setAddPackageState(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);
  return (
    <>
      {addPackageState ? (
        <div
          className="r-m-background"
          onClick={closeModal}
          ref={addPackageStateModalRef}
        >
          <animated.div style={animation}>
            <div className="r-m-wrapper">
              <div className="r-m-content">
                {error === "" ? (
                  <>
                    <h1 style={{ color: "green" }}>
                      Package added successfully
                    </h1>
                  </>
                ) : (
                  <>
                    <h1 style={{ color: "red" }}>
                      Error
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

export default AddPackageState;
