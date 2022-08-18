import React, { useState, useEffect } from "react";
import "./Product.css";

const Product = (props) => {
  const { product, productList, setProductList } = props;
  let [num, setNum] = useState(0);
  let incNum = () => {
    if (num < parseInt(product.max)) {
      setNum(Number(num) + 1);
      let objIndex = productList.findIndex((obj) => obj.id === product.id);
      productList[objIndex].quantity = num + 1;
    }
  };
  let decNum = () => {
    if (num > parseInt(product.min)) {
      setNum(Number(num) - 1);
      let objIndex = productList.findIndex((obj) => obj.id === product.id);
      productList[objIndex].quantity = num - 1;
    }
  };

  useEffect(() => {
    setNum(product.quantity);
  }, []);

  return (
    <>
      <div className="product__">
        <span className="product__price">{product.price}</span>
        <img className="product__image" src={product.image} alt="" />
        <div className="product__title__wrapper">
          <h1 className="product__title">{product.name}</h1>
        </div>
        <hr />
        <div className="product__txt">
          <b>Quantity unit: {product.quantity_unit}</b>
          <br />
          Min quantity: {product.min}
          <br />
          Max quantity: {product.max}
        </div>

        <div className="input-group">
          <div className="input-group-prepend">
            <button className="btn-dec btn-dark" type="button" onClick={decNum}>
              -
            </button>
          </div>
          <input type="text" className="quantity" value={num} />
          <div className="input-group-prepend">
            <button className="btn-inc btn-dark" type="button" onClick={incNum}>
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
