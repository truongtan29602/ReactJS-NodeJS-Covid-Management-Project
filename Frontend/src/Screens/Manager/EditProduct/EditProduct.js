import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserActions } from "../../../store/actions/UserActions";
import Sidebar from "../Sidebar/Sidebar";
import "./EditProduct.css";

const EditProduct = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const [product, setProduct] = useState({
    id: null,
    name: "",
    price: null,
    quantity_unit: "",
    image: "",
  });
  const [productName, setProductName] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [price, setPrice] = useState();
  const [quantityUnit, setQuantityUnit] = useState("");
  const refresh = () => {
    dispatch(UserActions.getProductByID(parseInt(params.product_id))).then(
      (result) => {
        setProduct(result.product);
        setProductName(result.product.name);
        setImageLink(result.product.image);
        setPrice(result.product.price);
        setQuantityUnit(result.product.quantity_unit);
      }
    );
  };
  const updateProduct = () => {
    dispatch(
      UserActions.updateProduct(
        parseInt(params.product_id),
        productName,
        imageLink,
        price,
        quantityUnit
      )
    ).then((result) => {
      alert(result.message);
      refresh();
    });
  };

  useEffect(() => {
    dispatch(UserActions.getProductByID(parseInt(params.product_id))).then(
      (result) => {
        setProduct(result.product);
        setProductName(result.product.name);
        setImageLink(result.product.image);
        setPrice(result.product.price);
        setQuantityUnit(result.product.quantity_unit);
      }
    );
  }, []);

  return (
    <div className="user-list-wrapper">
      <Sidebar props={props} />
      <div className="col-9">
        <div className="section">
          <a
            href={"/manager/" + params.id + "/productList"}
            className="btn btn-danger"
          >
            Back
          </a>
          <div className="section-title">Product details</div>
          <section className="product">
            <div className="product__photo">
              <div
                className="photo-container"
                style={{
                  backgroundImage: `url(${product.image})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="photo-album">
                  <h3>{product.name}</h3>
                </div>
              </div>
            </div>
            <div className="product__info">
              <div className="title">
                <h1>{product.name}</h1>
                <span>Product id: {product.product_id}</span>
              </div>
              <div className="price">
                Price <span>{product.price} </span>VND
              </div>
              <div className="description">
                <h3 className="product-header">Quantity Unit</h3>
                <span>{product.quantity_unit}</span>
              </div>
            </div>
          </section>
        </div>
        <div className="col-12">
          <div className="general-information">
            <h1 className="mx-5 mb-5">Edit product</h1>
            <div className="card card-bg mb-3 text-dark">
              <div className="card-body w-100">
                <h1>
                  Product new information : <b className="text-danger"></b>
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
                    placeholder={product.name}
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
                    placeholder={product.image}
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
                    placeholder={product.price}
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
                    placeholder={product.quantity_unit}
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
                    onClick={updateProduct}
                  >
                    Submit update form
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
