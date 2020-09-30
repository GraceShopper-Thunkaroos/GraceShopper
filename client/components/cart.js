import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchCartItems, deleteCartItem } from "../store/cart";
import { me } from "../store/user";
import { MdDone } from "react-icons/md";

class Cart extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  async componentDidMount() {
    this.props.fetchCartItems();
  }

  onSubmit() {
    if (this.props.user.id) {
      this.props.history.push("/checkout");
    } else {
      this.props.history.push("/signup");
    }
  }

  render() {
    const cartItems = this.props.cartItems;
    const user = this.props.user;
    let numItems = 0;
    if (cartItems) {
      if (cartItems.length > 0) {
        numItems = cartItems.reduce((accum, currentItem) => {
          accum += currentItem.quantity;
          return accum;
        }, 0);
      }
    }
    let totalOrderCost = 0;
    return (
      <div className="cart">
        <div className="cart__left">
          <div className="cart__left__header">
            <h4>{user.firstName}'s Cart:</h4>
          </div>
          {cartItems.length ? (
            cartItems.map(item => {
              const { product, quantity } = item;
              totalOrderCost += parseInt(product.price, 10);
              return (
                <div key={product.id} className="cart-items">
                  <div className="cart-items__left">
                    <img src={product.picture} alt="" />
                  </div>
                  <div className="cart-items__right">
                    <h4>Name: {product.name}</h4>
                    <h4>
                      Quantity:
                      <select
                        defaultValue={Math.min(product.quantity, quantity)}
                        onChange={this.onChange}
                      >
                        {(() => {
                          const options = [];
                          for (let i = 1; i <= product.quantity; i++) {
                            options.push(<option value={`${i}`}>{i}</option>);
                          }
                          return options;
                        })()}
                      </select>
                    </h4>
                    <h4>Price: {`$ ${product.price}`}</h4>
                  </div>
                  <div className="cart-items__input">
                    <div className="cart-items__buttons">
                      <button
                        type="button"
                        onClick={() => this.props.deleteCartItem(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h2>Currently, there are no items in your cart.</h2>
          )}
        </div>
        <div className="cart__right">
          <div className="cart__right__container">
            <div className="cart__right__top">
              {cartItems.length === 0 ? (
                <h4>Go find your next bestfriend!</h4>
              ) : (
                <div className="cart__right__summary">
                  <h4>Order Summary</h4>
                  <div className="summary__line">
                    {cartItems ? (
                      <h6>
                        {numItems} {numItems === 1 ? "Dog" : "Dogs"}
                      </h6>
                    ) : (
                      <h4>loading</h4>
                    )}
                    <h6>${totalOrderCost}</h6>
                  </div>
                  <div className="summary__line">
                    <h6>Shipping</h6>
                    <h6>FREE</h6>
                  </div>
                  <div className="summary__line">
                    <h5>Grand Total:</h5>
                    <h5>${totalOrderCost}</h5>
                  </div>
                </div>
              )}
            </div>
            <div className="cart__right__bottom">
              <button
                type="button"
                onClick={this.onSubmit}
                disabled={!(totalOrderCost > 0)}
              >
                Proceed to checkout <MdDone />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    cartItems: state.cartItems,
    user: state.user
  };
};

const mapDispatch = dispatch => ({
  fetchCartItems: () => dispatch(fetchCartItems()),
  deleteCartItem: productId => dispatch(deleteCartItem(productId))
});

export default connect(mapState, mapDispatch)(Cart);
