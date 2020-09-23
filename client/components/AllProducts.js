import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { ProductCard } from "./product-card";

class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    const products = this.props.products;
    console.log("these are the products", products);
    return (
      <div id="All-Products" className="List">
        <h1>All Products</h1>
        <div className="All-Products-Container">
          {products.map(product => {
            return (
              <ProductCard key={product.id} product={product} />
              // <div key={product.id}>
              //   <div>
              //     <Link to={`/products/${product.id}`}>
              //       <h1>{product.name}</h1>
              //     </Link>
              //     <div className="tab-image" id="dog-image">
              //       <img src={product.picture} />
              //     </div>
              //     <div className="tab-description" id="dog-description">
              //       <h2>
              //         Description
              //         <p>{product.description}</p>
              //       </h2>
              //     </div>
              //   </div>
              //   <ul>
              //     <li>Breed: {product.breed}</li>
              //     <li>Quantity: {product.quantity}</li>
              //     <li>Price for the pooch: {product.price}</li>
              //   </ul>
              // </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    products: state.products
  };
};

const mapDispatch = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
});

export default connect(mapState, mapDispatch)(AllProducts);
