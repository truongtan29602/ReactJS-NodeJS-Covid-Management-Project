import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./AddProduct.css";
import Sidebar from "../Sidebar/Sidebar";
import { UserActions } from "../../../store/actions/UserActions";

const AddProduct = (props) => {
  const [productName, setProductName] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [price, setPrice] = useState();
  const [quantityUnit, setQuantityUnit] = useState("");

  const dispatch = useDispatch();

  const addProduct = () => {
    dispatch(
      UserActions.addProduct(productName, imageLink, price, quantityUnit)
    ).then((result) => {
      alert(result.message);
    });
  };

  return (
    <div className="add-product-wrapper">
      <Sidebar props={props} />
      <div className="col-9">
        <div className="general-information">
          <h1 className="mx-5 mb-5">Add new product</h1>
          <div className="card card-bg mb-3 text-dark">
            <div className="card-body w-100">
              <h1>
                Product information : <b className="text-danger"></b>
              </h1>
              <div className="input-group mb-3">
                <label
                  className="input-group-text text-form"
                  style={{ width: "15%" }}
                >
                  Product name
                </label>
                <input
                  type="text"
                  className="form-control text-form text-location-form"
                  placeholder="Input product name"
                  style={{ width: "85%" }}
                  value={productName}
                  onChange={(e) => {
                    setProductName(e.target.value);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <label
                  className="input-group-text text-form"
                  style={{ width: "15%" }}
                >
                  Image link
                </label>
                <input
                  type="text"
                  className="form-control text-form text-location-form"
                  placeholder="Input link of image"
                  style={{ width: "85%" }}
                  value={imageLink}
                  onChange={(e) => {
                    setImageLink(e.target.value);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <label
                  className="input-group-text text-form"
                  style={{ width: "15%" }}
                >
                  Price
                </label>
                <input
                  type="number"
                  className="form-control text-form text-location-form"
                  placeholder="Input price"
                  style={{ width: "85%" }}
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <label
                  className="input-group-text text-form"
                  style={{ width: "15%" }}
                >
                  Quantity unit
                </label>
                <input
                  type="text"
                  className="form-control text-form text-location-form"
                  placeholder="Input quantity unit"
                  style={{ width: "85%" }}
                  value={quantityUnit}
                  onChange={(e) => {
                    setQuantityUnit(e.target.value);
                  }}
                />
              </div>
              <div className="w-100 text-center">
                <button
                  className="btn btn-success w-25 text-center"
                  onClick={addProduct}
                >
                  Create product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
