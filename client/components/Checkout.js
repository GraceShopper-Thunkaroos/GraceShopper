import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
// import { Cart } from "./cart";
// import { fetchCartItems } from "../store/cart";
import { fetchOrder } from "../store/order";

class Checkout extends Component {
  componentDidMount() {
    this.props.fetchOrder(this.props.order.id);
  }

  onSubmit() {
    this.props.history.push("/thankyou");
  }

  render() {
    const order = this.props.order;
    console.log("this is the order", order);
    // const order = this.props.order;
    return (
      <div id="checkout-page">
        <h1> Checkout page</h1>
        <div className="All-Products-Container">
          {/* {cartItems.map((item) => {
            return <Cart key={item.id} item={item} />;
          })} */}
        </div>
        <div id="order-details">
          <h2>order details</h2>
          {order ? (
            <div key={order.id}>
              <h3>{order.status}</h3>
              <ul>
                <li>totalPrice: {order.totalPrice}</li>
                <li>instruction: {order.intruction}</li>
                <li>purchase date: {order.purchaseDate}</li>
                <li>expected delivery date {order.expectedDeliveryDate}</li>
              </ul>
            </div>
          ) : (
            <button type="button" onClick={this.onSubmit}>
              {" "}
              confirm order
            </button>
          )}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    // cartItems: state.cartItems,
    order: state.order
  };
};

const mapDispatch = dispatch => ({
  // fetchCartItems: (userId) => dispatch(fetchCartItems(userId)),
  fetchOrder: userId => dispatch(fetchOrder(userId))
});

export default connect(mapState, mapDispatch)(Checkout);
