import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCartItems, deleteCartItem } from "../store/cart";
import { me } from "../store/user";
import { MdDone } from "react-icons/md";

class Cart extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }
  componentDidMount() {
    if (this.props.user.id) {
      console.log(this.props.user.id);
      this.props.fetchCartItems(this.props.user.id);
    }
  }

  onClick(userId, productId) {
    this.props.deleteCartItem(userId, productId);
  }

  onSelect(e) {
    console.log(e.target.value);
  }

  onSubmit() {
    console.log("Purchase submitted now");
    this.props.history.push("/checkout");
  }

  render() {
    const cartItems = this.props.cartItems;
    const user = this.props.user;
    const numItems = cartItems.reduce((accum, currentItem) => {
      accum += currentItem.quantity;
      return accum;
    }, 0);

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
                      <select defaultValue={quantity} onChange={this.onSelect}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </h4>
                    <h4>Price: {`$ ${product.price}`}</h4>
                  </div>
                  <div className="cart-items__input">
                    <div className="cart-items__buttons">
                      <button
                        type="button"
                        onClick={() => this.onClick(user.id, product.id)}
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
              <div className="cart__right__summary">
                <h4>Order Summary</h4>
                <div className="summary__line">
                  <h6>{numItems} Dogs</h6>
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
  fetchCartItems: userId => dispatch(fetchCartItems(userId)),
  fetchMe: () => dispatch(me()),
  deleteCartItem: (userId, id) => dispatch(deleteCartItem(userId, id))
});

export default connect(mapState, mapDispatch)(Cart);
