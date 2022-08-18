import React from "react";
import "./EditPackageState.css";
import { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";

const EditPackageState = (props) => {
  const { editPackageState, setEditPackageState, error, setError } = props;
  const editPackageStateModalRef = useRef();
  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: editPackageState ? 1 : 0,
    transform: editPackageState ? `translateY(0%)` : `translateY(-100%)`,
  });
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && editPackageState) {
        setEditPackageState(false);
      }
    },
    [setEditPackageState, editPackageState]
  );
  const closeModal = (e) => {
    if (editPackageStateModalRef.current === e.target) {
      setEditPackageState(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);
  return (
    <>
      {editPackageState ? (
        <div
          className="r-m-background"
          onClick={closeModal}
          ref={editPackageStateModalRef}
        >
          <animated.div style={animation}>
            <div className="r-m-wrapper">
              <div className="r-m-content">
                {error === "" ? (
                  <>
                    <h1 style={{ color: "green" }}>
                      Package edited successfully
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

export default EditPackageState;
