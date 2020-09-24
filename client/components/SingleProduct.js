import React, { Component } from "react";
import { connect } from "react-redux";
import { FaDog } from "react-icons/fa";
import { fetchProduct } from "../store/product";
import { ProductCard } from "./product-card";

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputField: 1
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    this.props.fetchProduct(this.props.match.params.id);
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {};

  render() {
    const product = this.props.product;
    const upcharge = parseInt(product.price, 10) + product.price * 0.8;
    return (
      <>
        <div className="singleProduct__parent">
          {/* <div className="singleProduct__left"></div> */}
          <div className="singleProduct">
            {product ? (
              <div className="singleProduct__container">
                <div className="singleProduct__container__left">
                  <img src={product.picture} alt="" />
                </div>
                <div className="singleProduct__container__right">
                  <h1>{product.name}</h1>
                  <div className="singleProduct__price">
                    <h4>${product.price}</h4>
                    <h4>${upcharge}</h4>
                  </div>

                  <div className="singleProduct__quantity__input">
                    <label>Quantity </label>{" "}
                    <input
                      name="inputField"
                      type="number"
                      value={this.state.inputField}
                      onChange={this.onChange}
                      min="0"
                    />
                  </div>
                  <button type="button">
                    Add To Cart {"  "}
                    <span />
                    <FaDog />
                  </button>
                  <hr />
                  <div className="singleProduct__desc">
                    <h3>{product.description}</h3>
                  </div>
                </div>
              </div>
              <button type="button" onSubmit={this.onSubmit}>
                Add To Cart {"  "}
                <FaDog />
              </button>
              <hr />
              <h3>{product.description}</h3>
            </div>
            ) : (
              <h4>Loading Product...</h4>
            )}
          </div>
          <div className="singleProduct__right">
            <h4>Dogs You May Like!</h4>
            <ProductCard product={product} />
            <ProductCard product={product} />
            <ProductCard product={product} />
            <ProductCard product={product} />
            <ProductCard product={product} />
            <ProductCard product={product} />
            <ProductCard product={product} />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.product
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProduct: productId => dispatch(fetchProduct(productId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
