import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
// import { Cart } from "./cart";
// import { fetchCartItems } from "../store/cart";
import { fetchOrder } from "../store/order";

class Checkout extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.fetchOrder(this.props.user.id);
  }

  onSubmit() {
    this.props.history.push("/thankyou");
    console.log("this is the history", history);
  }

  render() {
    console.log(this);
    const order = this.props.order;
    const { product, billing, address } = this.props.order;
    console.log("these are the products", product);
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
              {/* {address.length ? ( address.map(currentAddress => {
                const { street1, street2, city, state, country, zipcode, type } = currentAddress
                return ( 
                  <select defaultValue={address}>
                    <option>{currentAddress}</option>
                  </select>
                )
              })) : (
                <h4> no address <h4>
              ) */}
              <label type="text" address="address" placeholder="address">
                <select onChange={this.handleSelectChange}>
                  <option>address 1</option>
                  <option>address 2</option>
                  <option>address 2</option>
                </select>
              </label>
              {/* {billing.length ? ( billing.map(currentBilling => {
                const { cardNumber, securityCode, expriationDate, name } = currentAddress
                return (
                  <select defaultValue={billing}>
                    <option>{currentBilling}</option>
                  </select>
                )
              })) : (
                <h4> no billing information <h4> 
                */}
              <label type="text" billing="billing" placeholer="billing">
                <select>
                  <option>billing info 1</option>
                  <option>billing info 2</option>
                </select>
              </label>
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
