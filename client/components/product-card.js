import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

/**
 * COMPONENT
 */
export const ProductCard = props => {
  // const { product } = props;
  return (
    <h4>Product Card</h4>
    // <Card>
    //   <Link to={`/products/${product.id}`}> {product.name} </Link>
    //   <Card.Img src={product.picture} />
    //   <Card.Title> {product.name} </Card.Title>
    //   <Card.Body>
    //     {" "}
    //     {product.breed} | {product.price}{" "}
    //   </Card.Body>
    // </Card>
  );
};

/**
 * PROP TYPES
 */
// ProductCard.propTypes = {
//   product: PropTypes.object.isRequired,
// };
