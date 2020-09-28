import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { ProductCard } from "./product-card";
import { SingleProductCard } from "./SingleProductCard";

class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    const products = this.props.products;
    let main = Math.floor(Math.random() * products.length);

    return (
      <div className="allproducts">
        <h1>All Dogs</h1>
        <div className="allproducts__container">
          <div className="allproducts__left">
            <div className="allproducts__main">
              <SingleProductCard
                product={products[main]}
                history={this.props.history}
              />
            </div>
          </div>
          <div className="allproducts__right__header">
            <h4>Other Dogs You'll Love!</h4>
          </div>
          <div className="allproducts__right">
            <div className="allproducts__container__items">
              {products.map(product => {
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    history={this.props.history}
                  />
                );
              })}
            </div>
          </div>
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
