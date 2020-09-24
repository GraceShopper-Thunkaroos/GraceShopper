import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import Card from "react-bootstrap/Card";

/**
 * COMPONENT
 */
export const ProductCard = props => {
  const { product } = props;
  console.log(product);
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <img src={product.picture} />
        <h3> {product.name} </h3>
        <h4>
          {" "}
          {product.breed} | {product.price}{" "}
        </h4>
      </Link>
    </div>
  );
};

/**
 * PROP TYPES
 */
// ProductCard.propTypes = {
//   product: PropTypes.object.isRequired,
// };

/* <Card>
  <Link to={`/products/${product.id}`}>
    <img src={product.picture} />
    <Card.Title> {product.name} </Card.Title>
    <Card.Body>
      {" "}
      {product.breed} | {product.price}{" "}
    </Card.Body>
  </Link>
</Card> */
