import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
// import { Cart } from "./cart";
// import { fetchCartItems } from "../store/cart";
import { fetchCheckout } from "../store/order";
import { CheckoutCard } from "./CheckoutCard";
import { purchaseCart } from "../store/cart";
//import months from "../../server/db/months";
import years from "../../server/db/years";

let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12"
];

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
      shipping_country: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    this.props.fetchCheckout();
  }
  onChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  onSubmit() {
    let checkedYear = parseInt(this.state.cc_year, 10);
    let checkedCvC = parseInt(this.state.cc_cvc, 10);
    let checkedCC = parseInt(this.state.cc_number, 10);

    let numRegex = /^\d+$/;

    let errorsArr = [];

    // //cc year
    // if (numRegex.test(checkedYear) === false) {
    //   errorsArr.push("Billing CC Year must be greater than or equal to 2020");
    // }

    // if (checkedYear < 20) {
    //   errorsArr.push("Billing CC Year must be greater than or equal to 2020");
    // }

    // if (numRegex.test(checkedCvC) === false) {
    //   errorsArr.push("Please enter a valid CVC");
    // }

    // if (this.state.cc_cvc.length < 3) {
    //   errorsArr.push("Please enter a valid CVC");
    // }

    // if (numRegex.test(checkedCC) === false) {
    //   errorsArr.push("Please enter a valid CC number");
    // }

    // console.log("Errors, ", errorsArr);
    // console.log(this.state.cc_year, this.state.cc_cvc);

    if (errorsArr.length === 0) {
      // let billing = {
      //   cardNumber: this.state.cc_number,
      //   securityCode: this.state.cc_cvc,
      //   name: this.state.name,
      //   expirationDate: `${this.state.cc_month}/01/20${this.state.cc_year}`,
      // };

      let billing = {
        cardNumber: "123123123123",
        securityCode: "123",
        name: "Asim Samuel",
        expirationDate: "09/01/2021"
      };

      let shippingAddress = {
        street1: "12345 Asim Street",
        street2: "Apt 102",
        city: "Brooklyn",
        state: "New York",
        country: "USA",
        zipcode: "11234"
      };

      let billingAddress = {
        street1: "54321 misA Street",
        street2: "Apt 102",
        city: "Brooklyn",
        state: "New York",
        country: "USA",
        zipcode: "11234"
      };

      console.log({ billing, billingAddress, shippingAddress });

      this.props.purchaseCart("TEST", billing, billingAddress, shippingAddress);
      this.props.history.push("/thankyou");
    }
  }
  render() {
    console.log(this.state);
    console.log("these are months", months["1"]);
    const { order } = this.props;
    const monthArray = Object.keys(months);
    // console.log("these are months", monthArray)
    // console.log("these are months", months)
    console.log("this is the state", this.state);
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
        <h4>Checkout</h4>
        <div className="checkout__top">
          <div className="checkout__top__left">
            <h4>Billing Information</h4>
            <div className="checkout__top__billing">
              <div className="checkout__billing__info">
                <label>Full Name: </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="checkout__billing__info">
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
                <div className="checkout__billing__info">
                  <label>Month</label>
                  <select onChange={this.onChange}>
                    {(() => {
                      const monthOptions = [];
                      for (let i = 0; i <= 11; i++) {
                        monthOptions.push(
                          <option value={`${i + 1}`}>{months[i]}</option>
                        );
                      }
                      // console.log("these are months options", monthOptions)
                      return monthOptions;
                    })()}
                  </select>
                </div>

                <div className="checkout__billing__info">
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

                <div className="checkout__billing__info">
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
            <div className="checkout__address">
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
            <div className="checkout__address">
              <label>City: </label>
              <input
                type="text"
                placeholder="City"
                name="billing_city"
                value={this.state.billing_city}
                onChange={this.onChange}
              />
            </div>
            <div className="checkout__address">
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
            <div className="checkout__address">
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
            <div className="checkout__address">
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
            {order.map(product => <CheckoutCard product={product} />)}
          </div>
        </div>
        <div className="checkout__bottom">
          <div className="checkout__bottom__left">
            <h5>Shipping Address</h5>
            <div className="checkout__address">
              <label>Full Name: </label>
              <input
                type="text"
                placeholder="Name"
                value={this.state.shipping_fn}
                onChange={this.onChange}
                name="shipping_fn"
              />
            </div>
            <div className="checkout__address">
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
            <div className="checkout__address">
              <label>City: </label>
              <input
                type="text"
                placeholder="City"
                name="shipping_city"
                value={this.state.shipping_city}
                onChange={this.onChange}
              />
            </div>
            <div className="checkout__address">
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
            <div className="checkout__address">
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
            <div className="checkout__address">
              <label>Country: </label>
              <input
                type="text"
                placeholder="Country"
                name=""
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
              </button>{" "}
            </div>
          </div>
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
  fetchCheckout: () => dispatch(fetchCheckout()),
  purchaseCart: (instruction, billing, billingAddress, shippingAddress) =>
    dispatch(
      purchaseCart(instruction, billing, billingAddress, shippingAddress)
    )
});

export default connect(mapState, mapDispatch)(Checkout);
