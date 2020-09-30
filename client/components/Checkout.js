/* eslint-disable react/no-array-index-key */
/* eslint-disable complexity */
/* eslint-disable max-statements */
/* eslint-disable camelcase */
import React, { Component } from "react";
import { connect } from "react-redux";
import { CheckoutCard } from "./CheckoutCard";
import { purchaseCart, deleteCartItem, fetchCartItems } from "../store/cart";
import { Redirect } from "react-router-dom";

let errorsArr = [];

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      cc_number: "",
      cc_month: "",
      cc_year: "",
      cc_cvc: "",
      billing_street1: "",
      billing_street2: "",
      billing_city: "",
      billing_state: "",
      billing_zc: "",
      billing_country: "",
      shipping_fn: "",
      shipping_street1: "",
      shipping_street2: "",
      shipping_city: "",
      shipping_state: "",
      shipping_zc: "",
      shipping_country: "",
      checkoutAttempt: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  componentDidMount() {
    this.props.fetchCartItems();
  }
  onChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  onDelete(evt) {
    this.props.deleteCartItem(evt);
  }

  onSubmit() {
    let checkedMonth = parseInt(this.state.cc_month, 10);
    let checkedYear = parseInt(this.state.cc_year, 10);
    let checkedCvC = parseInt(this.state.cc_cvc, 10);
    let checkedCC = parseInt(this.state.cc_number, 10);
    let checkedBillZip = parseInt(this.state.billing_zc, 10);
    let checkedShipZip = parseInt(this.state.shipping_zc, 10);

    let numRegex = /^\d+$/;

    errorsArr = [];

    if (this.state.name === "") {
      errorsArr.push(1);
    }

    //cc number
    if (
      numRegex.test(checkedCC) === false ||
      this.state.cc_number.length < 12
    ) {
      errorsArr.push(2);
      // errorsArr.push("Please enter a valid CC number");
    }

    //cc month
    if (
      numRegex.test(checkedMonth) === false ||
      checkedMonth < 1 ||
      checkedMonth > 12
    ) {
      errorsArr.push(3);
      // errorsArr.push("Please enter a valid month");
    }

    //cc year
    if (numRegex.test(checkedYear) === false || checkedYear < 20) {
      errorsArr.push(4);
      // errorsArr.push("Billing CC Year must be greater than or equal to 2020");
    }

    //cc cvc
    if (numRegex.test(checkedCvC) === false || this.state.cc_cvc.length < 3) {
      errorsArr.push(5);
      // errorsArr.push("Please enter a valid CVC");
    }

    if (this.state.billing_street1 === "") {
      errorsArr.push(6);
    }

    if (this.state.billing_city === "") {
      errorsArr.push(7);
    }

    if (this.state.billing_state === "") {
      errorsArr.push(8);
    }

    //cc billing zip
    if (
      numRegex.test(checkedBillZip) === false ||
      this.state.billing_zc.length < 5
    ) {
      errorsArr.push(9);
      // errorsArr.push("Please enter a valid billing zip");
    }

    if (this.state.billing_country === "") {
      errorsArr.push(10);
    }

    if (this.state.shipping_fn === "") {
      errorsArr.push(11);
    }

    if (this.state.shipping_street1 === "") {
      errorsArr.push(12);
    }

    if (this.state.shipping_city === "") {
      errorsArr.push(13);
    }

    if (this.state.shipping_state === "") {
      errorsArr.push(14);
    }

    //cc shipping zip
    if (
      numRegex.test(checkedShipZip) === false ||
      this.state.shipping_zc.length < 5
    ) {
      errorsArr.push(15);
      // errorsArr.push("Please enter a valid billing zip");
    }

    if (this.state.shipping_country === "") {
      errorsArr.push(16);
    }

    if (errorsArr.length === 0) {
      let month = this.state.cc_month;
      if (month.length === 1) {
        month = "0" + month;
      }

      let billing = {
        cardNumber: this.state.cc_number,
        securityCode: this.state.cc_cvc,
        name: this.state.name,
        expirationDate: `${month}/01/20${this.state.cc_year}`
      };

      let shippingAddress = {
        street1: this.state.shipping_street1,
        street2: this.state.shipping_street2,
        city: this.state.shipping_city,
        state: this.state.shipping_state,
        country: this.state.shipping_country,
        zipcode: this.state.shipping_zc
      };

      let billingAddress = {
        street1: this.state.billing_street1,
        street2: this.state.billing_street2,
        city: this.state.billing_city,
        state: this.state.billing_state,
        country: this.state.billing_country,
        zipcode: this.state.billing_zc
      };

      this.props.purchaseCart(
        "Handle with care!",
        billing,
        billingAddress,
        shippingAddress
      );
      this.props.history.push("/thankyou");
    }
    this.setState({ checkoutAttempt: true });
  }
  render() {
    if (!this.props.user.id) {
      return <Redirect to="/signup" />;
    }
    const { cartItems: order } = this.props;
    const grandTotal = order.reduce((accum, currentValue) => {
      accum += currentValue.quantity * currentValue.product.price;
      return accum;
    }, 0);

    const numDogs = order.reduce((accum, currentValue) => {
      accum += currentValue.quantity;
      return accum;
    }, 0);

    return (
      <div className="checkout">
        {order.length > 0 ? (
          <React.Fragment>
            <h4>Checkout</h4>
            <div className="checkout__top">
              <div className="checkout__top__left">
                <h4>Billing Information</h4>
                <div className="checkout__top__billing">
                  <div
                    className={
                      this.state.checkoutAttempt
                        ? errorsArr.includes(1)
                          ? "checkout__billing__info__active"
                          : "checkout__billing__info"
                        : "checkout__billing__info"
                    }
                  >
                    <label>Full Name: </label>
                    <input
                      type="text"
                      placeholder="Full Name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                  </div>
                  <div
                    className={
                      this.state.checkoutAttempt
                        ? errorsArr.includes(2)
                          ? "checkout__billing__info__active"
                          : "checkout__billing__info"
                        : "checkout__billing__info"
                    }
                  >
                    <label>Credit Card Number: </label>
                    <input
                      type="text"
                      placeholder="Credit Card Number"
                      name="cc_number"
                      value={this.state.cc_number}
                      onChange={this.onChange}
                      maxLength="12"
                    />
                  </div>
                  <div className="checkout__billing__container">
                    <div
                      className={
                        this.state.checkoutAttempt
                          ? errorsArr.includes(3)
                            ? "checkout__billing__info__active"
                            : "checkout__billing__info"
                          : "checkout__billing__info"
                      }
                    >
                      <label>Month</label>
                      <input
                        type="text"
                        placeholder="Month"
                        name="cc_month"
                        value={this.state.cc_month}
                        onChange={this.onChange}
                        maxLength="2"
                      />
                    </div>

                    <div
                      className={
                        this.state.checkoutAttempt
                          ? errorsArr.includes(4)
                            ? "checkout__billing__info__active"
                            : "checkout__billing__info"
                          : "checkout__billing__info"
                      }
                    >
                      <label>Year</label>
                      <input
                        type="text"
                        placeholder="Year"
                        name="cc_year"
                        value={this.state.cc_year}
                        onChange={this.onChange}
                        maxLength="2"
                      />
                    </div>

                    <div
                      className={
                        this.state.checkoutAttempt
                          ? errorsArr.includes(5)
                            ? "checkout__billing__info__active"
                            : "checkout__billing__info"
                          : "checkout__billing__info"
                      }
                    >
                      <label>CVC</label>
                      <input
                        type="text"
                        placeholder="CVC"
                        name="cc_cvc"
                        value={this.state.cc_cvc}
                        onChange={this.onChange}
                        maxLength="3"
                      />
                    </div>
                  </div>
                </div>
                <h5>Billing Address</h5>
                <div
                  className={
                    this.state.checkoutAttempt
                      ? errorsArr.includes(6)
                        ? "checkout__address__active"
                        : "checkout__address"
                      : "checkout__address"
                  }
                >
                  <label>Street 1:</label>
                  <input
                    type="text"
                    placeholder="Street 1"
                    name="billing_street1"
                    value={this.state.billing_street1}
                    onChange={this.onChange}
                  />
                </div>
                <div className="checkout__address">
                  <label>Street 2: </label>
                  <input
                    type="text"
                    placeholder="Street 2"
                    name="billing_street2"
                    value={this.state.billing_street2}
                    onChange={this.onChange}
                  />
                </div>
                <div
                  className={
                    this.state.checkoutAttempt
                      ? errorsArr.includes(7)
                        ? "checkout__address__active"
                        : "checkout__address"
                      : "checkout__address"
                  }
                >
                  <label>City: </label>
                  <input
                    type="text"
                    placeholder="City"
                    name="billing_city"
                    value={this.state.billing_city}
                    onChange={this.onChange}
                  />
                </div>
                <div
                  className={
                    this.state.checkoutAttempt
                      ? errorsArr.includes(8)
                        ? "checkout__address__active"
                        : "checkout__address"
                      : "checkout__address"
                  }
                >
                  <label>State: </label>
                  <input
                    type="text"
                    placeholder="State"
                    name="billing_state"
                    value={this.state.billing_state}
                    onChange={this.onChange}
                    maxLength="2"
                  />
                </div>
                <div
                  className={
                    this.state.checkoutAttempt
                      ? errorsArr.includes(9)
                        ? "checkout__address__active"
                        : "checkout__address"
                      : "checkout__address"
                  }
                >
                  <label>Zip Code: </label>
                  <input
                    type="text"
                    placeholder="Zip Code"
                    name="billing_zc"
                    value={this.state.billing_zc}
                    onChange={this.onChange}
                    maxLength="5"
                  />
                </div>
                <div
                  className={
                    this.state.checkoutAttempt
                      ? errorsArr.includes(10)
                        ? "checkout__address__active"
                        : "checkout__address"
                      : "checkout__address"
                  }
                >
                  <label>Country: </label>
                  <input
                    type="text"
                    placeholder="Country"
                    name="billing_country"
                    value={this.state.billing_country}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="checkout__top__right">
                {order.map((product, iter) => (
                  <CheckoutCard
                    product={product}
                    key={`${product}+${iter}`}
                    onSubmit={this.onDelete}
                  />
                ))}
              </div>
            </div>
            <div className="checkout__bottom">
              <div className="checkout__bottom__left">
                <h5>Shipping Address</h5>
                <div
                  className={
                    this.state.checkoutAttempt
                      ? errorsArr.includes(11)
                        ? "checkout__address__active"
                        : "checkout__address"
                      : "checkout__address"
                  }
                >
                  <label>Full Name: </label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={this.state.shipping_fn}
                    onChange={this.onChange}
                    name="shipping_fn"
                  />
                </div>
                <div
                  className={
                    this.state.checkoutAttempt
                      ? errorsArr.includes(12)
                        ? "checkout__address__active"
                        : "checkout__address"
                      : "checkout__address"
                  }
                >
                  <label>Street 1:</label>
                  <input
                    type="text"
                    placeholder="Street 1"
                    name="shipping_street1"
                    value={this.state.shipping_street1}
                    onChange={this.onChange}
                  />
                </div>
                <div className="checkout__address">
                  <label>Street 2: </label>
                  <input
                    type="text"
                    placeholder="Street 2"
                    name="shipping_street2"
                    value={this.state.shipping_street2}
                    onChange={this.onChange}
                  />
                </div>
                <div
                  className={
                    this.state.checkoutAttempt
                      ? errorsArr.includes(13)
                        ? "checkout__address__active"
                        : "checkout__address"
                      : "checkout__address"
                  }
                >
                  <label>City: </label>
                  <input
                    type="text"
                    placeholder="City"
                    name="shipping_city"
                    value={this.state.shipping_city}
                    onChange={this.onChange}
                  />
                </div>
                <div
                  className={
                    this.state.checkoutAttempt
                      ? errorsArr.includes(14)
                        ? "checkout__address__active"
                        : "checkout__address"
                      : "checkout__address"
                  }
                >
                  <label>State: </label>
                  <input
                    type="text"
                    placeholder="State"
                    name="shipping_state"
                    value={this.state.shipping_state}
                    onChange={this.onChange}
                    maxLength="2"
                  />
                </div>
                <div
                  className={
                    this.state.checkoutAttempt
                      ? errorsArr.includes(15)
                        ? "checkout__address__active"
                        : "checkout__address"
                      : "checkout__address"
                  }
                >
                  <label>Zip Code: </label>
                  <input
                    type="text"
                    placeholder="Zip Code"
                    name="shipping_zc"
                    value={this.state.shipping_zc}
                    onChange={this.onChange}
                    maxLength="5"
                  />
                </div>
                <div
                  className={
                    this.state.checkoutAttempt
                      ? errorsArr.includes(16)
                        ? "checkout__address__active"
                        : "checkout__address"
                      : "checkout__address"
                  }
                >
                  <label>Country: </label>
                  <input
                    type="text"
                    placeholder="Country"
                    name="shipping_country"
                    value={this.state.shipping_country}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="checkout__bottom__right">
                <div className="checkout__bottom__info">
                  <h4>
                    {numDogs} {numDogs === 1 ? "Dog" : "Dogs"}
                  </h4>
                  <h4>Total: ${grandTotal}</h4>
                  <button type="button" onClick={this.onSubmit}>
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div className="checkout__empty">
            <h4>Go Find Your New Best Friend!</h4>
            <img
              src="https://www.perfectdogbreeds.com/wp-content/uploads/2020/05/Small-Golden-Retriever.jpg"
              alt="golden retriever"
              onClick={() => this.props.history.push("/products")}
            />
            <button
              type="button"
              onClick={() => this.props.history.push("/products")}
            >
              See More Dogs Here!
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => {
  return {
    order: state.order,
    user: state.user,
    cartItems: state.cartItems
  };
};

const mapDispatch = dispatch => ({
  fetchCartItems: () => dispatch(fetchCartItems()),
  purchaseCart: (instruction, billing, billingAddress, shippingAddress) =>
    dispatch(
      purchaseCart(instruction, billing, billingAddress, shippingAddress)
    ),
  deleteCartItem: id => dispatch(deleteCartItem(id))
});

export default connect(mapState, mapDispatch)(Checkout);
