import React from "react";
import { useHistory } from "react-router-dom";

export const SingleProductCard = props => {
  const { product, history } = props;

  function onClick() {
    history.push(`/products/${product.id}`);
  }
  return (
    <div className="singleProductCard">
      {product ? (
        <React.Fragment>
          <img src={product.picture} alt="" />
          <div className="singleProductCard__info">
            <h4>{product.name}</h4>
            <h3>{product.description}</h3>
            <h4>${product.price}</h4>
          </div>
          <div className="singleProductCard__input">
            <button onClick={onClick}>View!</button>
          </div>
        </React.Fragment>
      ) : (
        <h4>Loading</h4>
      )}
    </div>
  );
};
