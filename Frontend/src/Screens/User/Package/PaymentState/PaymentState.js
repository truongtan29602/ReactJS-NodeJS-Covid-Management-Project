import React from "react";
import "./PaymentState.css";
import { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";

const PaymentState = (props) => {
  const { paymentState, setPaymentState, error, setError, total } = props;
  const paymentStateModalRef = useRef();
  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: paymentState ? 1 : 0,
    transform: paymentState ? `translateY(0%)` : `translateY(-100%)`,
  });
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && paymentState) {
        setPaymentState(false);
      }
    },
    [setPaymentState, paymentState]
  );
  const closeModal = (e) => {
    if (paymentStateModalRef.current === e.target) {
      setPaymentState(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);
  return (
    <>
      {paymentState ? (
        <div
          className="r-m-background"
          onClick={closeModal}
          ref={paymentStateModalRef}
        >
          <animated.div style={animation}>
            <div className="r-m-wrapper">
              <div className="r-m-content">
                {error === "" ? (
                  <>
                    <h1 style={{ color: "green" }}>
                      Purchased successfully 
                    </h1>
                  </>
                ) : (
                  <>
                    <h1 style={{ color: "red" }}>
                      Failed to purchase
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

export default PaymentState;
