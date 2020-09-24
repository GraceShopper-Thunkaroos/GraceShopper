import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { ProductCard } from "./product-card";

class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    const products = this.props.products;
    return (
      <div id="All-Products">
        <h1>All Products</h1>
        <div className="All-Products-Container">
          {products.map(product => {
            return <ProductCard key={product.id} product={product} />;
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
