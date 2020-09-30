import React from "react";

export const CheckoutCard = props => {
  const { product } = props.product;
  return (
    <div className="checkoutCard">
      <div className="checkoutCard__left">
        <img src={product.picture} />
      </div>
      <div className="checkoutCard__right">
        <h3> {product.name} </h3>
        <h4>
          {product.breed} | ${product.price}
        </h4>
      </div>
      <div className="checkoutCard__input">
        <button
          type="button"
          value={product.id}
          onClick={() => props.onSubmit(product.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
