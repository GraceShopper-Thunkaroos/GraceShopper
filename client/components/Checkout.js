import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
// import { Cart } from "./cart";
// import { fetchCartItems } from "../store/cart";
import { fetchOrder } from "../store/order";

class Checkout extends Component {
  componentDidMount() {
    this.props.fetchOrder(2);
  }

  onSubmit() {
    this.props.closeOrder();
    this.props.history.push("/thankyou");
    // console.log("this is the history", history)
  }

  render() {
    const order = this.props.order;
    const { product } = this.props.order;
    console.log("this is the product", product);
    // console.log("this is the order", order);
    return (
      <div id="checkout-page">
        <h1> Checkout</h1>
        <div className="All-Products-Container">
          {/* {cartItems.map((item) => {
            return <Cart key={item.id} item={item} />;
          })} */}
        </div>
        <div id="order-details">
          <h2>Order Details</h2>
          {order ? (
            <div key={order.id}>
              <h3>{order.status}</h3>
              <ul>
                <li>totalPrice: ${order.totalPrice}</li>
                <li>Instruction: {order.instruction}</li>
                <li>Purchase Date: {order.purchaseDate}</li>
                <li>Expected Delivery Date {order.expectedDeliveryDate}</li>
              </ul>
              <button type="button" onClick={this.onSubmit}>
                {" "}
                confirm order
              </button>
            </div>
          ) : (
            <h4> ...loading</h4>
          )}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    order: state.order,
    user: state.user
  };
};

const mapDispatch = dispatch => ({
  fetchOrder: userId => dispatch(fetchOrder(userId))
});

export default connect(mapState, mapDispatch)(Checkout);
