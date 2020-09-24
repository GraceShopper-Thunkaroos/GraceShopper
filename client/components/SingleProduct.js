import React, { Component } from "react";
import { connect } from "react-redux";
import { FaDog } from "react-icons/fa";
import { fetchProduct } from "../store/product";

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
    console.log(this.props);
    return (
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
              </div>

              <div className="singleProduct__quantity__input">
                <label>Quantity </label>{" "}
                <input
                  name="inputField"
                  type="number"
                  value={this.state.inputField}
                  onChange={this.onChange}
                />
              </div>
              <button type="button" onSubmit={this.onSubmit}>
                Add To Cart {"  "}
                <FaDog />
              </button>
              <hr />
              <h3>{product.description}</h3>
            </div>
          </div>
        ) : (
          <h4>Loading Product...</h4>
        )}
      </div>
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
