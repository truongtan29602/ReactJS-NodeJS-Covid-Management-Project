import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./Package.css";
import UserSidebar from "../UserSidebar/UserSidebar";
import { UserActions } from "../../../store/actions/UserActions";
import Product from "./Product/Product";
import Confirmation from "./Confirmation/Confirmation";
import PaymentState from "./PaymentState/PaymentState";

function abbreviateNumber(value) {
  var newValue = value;
  if (value >= 1000) {
    var suffixes = ["", "k", "m", "b", "t"];
    var suffixNum = Math.floor(("" + value).length / 3);
    var shortValue = "";
    for (var precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum !== 0
          ? value / Math.pow(1000, suffixNum)
          : value
        ).toPrecision(precision)
      );
      var dotLessShortValue = (shortValue + "").replace(/[^a-zA-Z 0-9]+/g, "");
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }
    if (shortValue % 1 !== 0) shortValue = shortValue.toFixed(1);
    newValue = shortValue + suffixes[suffixNum];
  }
  return newValue;
}

const Package = (props) => {
  const dispatch = useDispatch();
  const { user_id, package_id } = useParams();

  const [_package, set_Package] = useState({
    package_id: null,
    name: "",
    max_per_person_per_duration: null,
    duration: null,
    duration_unit: "",
    image: "",
  });
  const [productList, setProductList] = useState([]);
  const [confirmationStatus, setConfirmationStatus] = useState(false);
  const [paymentState, setPaymentState] = useState(false);
  const [error, setError] = useState(false);
  const total = () => {
    const total = productList.reduce((partialSum, product) => {
      return partialSum + product.quantity * product.price_float;
    }, 0);
    return total;
  };
  const purchase = () => {
    setConfirmationStatus(true);
  };

  useEffect(() => {
    dispatch(UserActions.getPackageByID(parseInt(package_id))).then(
      (result) => {
        set_Package(result.package);
        const rowDataFormatted = result.products.map((item) => {
          return {
            id: item.product_id,
            name: item.name,
            price: abbreviateNumber(item.price),
            price_float: parseFloat(item.price),
            image: item.image,
            quantity_unit: item.quantity_unit,
            min: item.min,
            max: item.max,
            quantity: item.min,
          };
        });
        setProductList(rowDataFormatted);
      }
    );
  }, []);

  return (
    <div className="purchase-wrapper">
      <UserSidebar props={props} />
      <div className="purchase-container">
        <div className="package-purchase-background">
          <a href={"/user/" + user_id + "/packages"} className="btn btn-danger">
            Back
          </a>
          <section className="package-details">
            <div className="package-details__package-photo">
              <div
                className="package-photo-container"
                style={{
                  backgroundImage: `url(${_package.image})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="package-photo-album">
                  <h3>{_package.name}</h3>
                </div>
              </div>
            </div>
            <div className="package-details__info">
              <div className="title">
                <h1>{_package.name}</h1>
                <span>Package id: {_package.package_id}</span>
              </div>
              <div className="price">
                Max / Duration:{" "}
                <span>{_package.max_per_person_per_duration} </span>/{" "}
                {_package.duration} {_package.duration_unit}
              </div>
              <div className="description">
                <h3 className="package-details-header">Description</h3>
                <ul>
                  <li>
                    <span>
                      Max per person per duration:{" "}
                      {_package.max_per_person_per_duration}
                    </span>
                  </li>
                  <li>
                    <span>
                      Duration: {_package.duration} {_package.duration_unit}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <br />
          <section className="package-details-products-wrapper">
            {productList.length > 0
              ? productList.map((product) => (
                  <Product
                    key={product.id}
                    product={product}
                    productList={productList}
                    setProductList={setProductList}
                  />
                ))
              : ""}
          </section>
          <section
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              className="btn btn-success"
              onClick={purchase}
            >
              Purchase
            </button>
          </section>
        </div>
      </div>
      <Confirmation
        confirmationStatus={confirmationStatus}
        setConfirmationStatus={setConfirmationStatus}
        paymentState={paymentState}
        setPaymentState={setPaymentState}
        error={error}
        setError={setError}
        packageName={_package.name}
        productList={productList}
        total={total()}
        duration={_package.duration}
        duration_unit={_package.duration_unit}
        max_per_person_per_duration={_package.max_per_person_per_duration}
      />
      <PaymentState
        paymentState={paymentState}
        setPaymentState={setPaymentState}
        error={error}
        setError={setError}
        total={total()}
      />
    </div>
  );
};

export default Package;
