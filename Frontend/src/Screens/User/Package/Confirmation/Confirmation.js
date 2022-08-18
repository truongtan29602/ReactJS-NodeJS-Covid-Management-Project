import React from "react";
import "./Confirmation.css";
import { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { UserActions } from "../../../../store/actions/UserActions";

const Confirmation = (props) => {
  const {
    confirmationStatus,
    setConfirmationStatus,
    paymentState,
    setPaymentState,
    error,
    setError,
    packageName,
    productList,
    total,
    duration,
    duration_unit,
    max_per_person_per_duration
  } = props;
  const { user_id, package_id } = useParams();
  const dispatch = useDispatch();
  const confirmStateModalRef = useRef();
  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: confirmationStatus ? 1 : 0,
    transform: confirmationStatus ? `translateY(0%)` : `translateY(-100%)`,
  });
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && confirmationStatus) {
        setConfirmationStatus(false);
      }
    },
    [setConfirmationStatus, confirmationStatus]
  );
  const closeModal = (e) => {
    if (confirmStateModalRef.current === e.target) {
      setConfirmationStatus(false);
    }
  };

  const confirm = async () => {
    const isMax = await dispatch(
        UserActions.getTotalPackgesPurchased(
          parseInt(user_id),
          packageName,
          duration,
          duration_unit
        )
      ).then((result) => {
        if(result.result >= max_per_person_per_duration){
            return false;
        }
        else
            return true;
      });
    if(!isMax){
        setPaymentState(true);
        setError("You have exceeded the maximum amount of this package which you can purchase this duration");
        return false;
    }
    
    dispatch(UserActions.getBalanceDebt(user_id)).then((result) => {
      setConfirmationStatus(false);
      if (result.debt > 0) {
        setPaymentState(true);
        setError("Please finish your debt payment before purchasing");
        return false;
      }
      if (result.balance >= total) {
        //api purchase
        dispatch(
          UserActions.paymentProcess(
            user_id,
            packageName,
            productList,
            total,
            parseFloat(result.balance) - parseFloat(total)
          )
        ).then((result) => {
          setPaymentState(true);
          setError("");
        });
        return true;
      }
      if (result.balance < total) {
        dispatch(UserActions.getMinimumPaymentLimit()).then((result2) => {
          if (
            parseFloat(result.balance) <
            parseFloat(parseFloat(result2.minimum_payment_limit.toFixed(2)) * total)
          ) {
            setPaymentState(true);
            setError("Your balance is below the minimum payment limit");
            return false;
          } else {
            dispatch(
              UserActions.debtProcess(
                user_id,
                packageName,
                productList,
                total,
                0,
                parseFloat(total) - parseFloat(result.balance)
              )
            ).then((result) => {
              setPaymentState(true);
              setError("");
            });
            return true;
          }
        });
      }
    });
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);
  return (
    <>
      {confirmationStatus ? (
        <div
          className="l-m-background"
          onClick={closeModal}
          ref={confirmStateModalRef}
        >
          <animated.div style={animation}>
            <div className="l-m-wrapper">
              <div className="l-m-content">
                <h1 style={{ color: "green" }}>Total bill</h1>
                <h3>{total} VND</h3>
                <div className="c-btn-wrapper">
                  <button
                    className="btn btn-danger"
                    onClick={() => setConfirmationStatus(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-success" onClick={confirm}>
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </animated.div>
        </div>
      ) : null}
    </>
  );
};

export default Confirmation;
