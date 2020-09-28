import React, { Component } from "react";
import { connect } from "react-redux";
import { FaDog } from "react-icons/fa";
import {
  fetchAdditionalProduct,
  fetchProduct,
  setNewProduct
} from "../store/product";
import { ProductCard } from "./product-card";
import { addItemToCart } from "../store/cart";

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputField: 1
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onClickSideBar = this.onClickSideBar.bind(this);
  }

  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
    this.props.fetchAdditionalProduct();
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onClick = async () => {
    const order = {
      productId: this.props.product.id,
      quantity: this.state.inputField
    };
    await this.props.addItemToCart(this.props.user.id, order);
    this.props.history.push("/cart");
  };

  onClickSideBar = id => {
    this.props.fetchNewProduct(id);
    this.props.fetchAdditionalProduct();
  };

  onSubmit = () => {};

  render() {
    const product = this.props.product;
    const upcharge = parseInt(product.price, 10) + product.price * 0.8;
    return (
      <React.Fragment>
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
                      max={product.quantity}
                    />
                  </div>
                  <button type="button" onClick={this.onClick}>
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
            ) : (
              <h4>Loading Product...</h4>
            )}
          </div>
          <div className="singleProduct__right">
            <h4>Dogs You May Like!</h4>
            {!this.props.sideProducts ? (
              <h4>Loading...</h4>
            ) : (
              this.props.sideProducts.map(item => {
                return (
                  <div
                    onClick={() => this.onClickSideBar(item.id)}
                    key={item.id}
                  >
                    <ProductCard product={item} history={this.props.history} />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.product,
    user: state.user,
    sideProducts: state.sideProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProduct: productId => dispatch(fetchProduct(productId)),
    addItemToCart: (userId, order) => dispatch(addItemToCart(userId, order)),
    fetchAdditionalProduct: () => dispatch(fetchAdditionalProduct()),
    fetchNewProduct: productId => dispatch(setNewProduct(productId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
