import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
// import { Cart } from "./cart";
// import { fetchCartItems } from "../store/cart";
import { fetchCheckout } from "../store/order";
import { CheckoutCard } from "./CheckoutCard";

class Checkout extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.fetchCheckout();
  }

  onSubmit() {
    this.props.history.push("/thankyou");
  }

  render() {
    const { order } = this.props;

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
              <div className="checkout__address">
                <label>Full Name: </label>
                <input type="text" placeholder="Name" />
              </div>
              <div className="checkout__billing__info">
                <label>Credit Card Number: </label>
                <input type="text" placeholder="Name" />
              </div>
              <div className="checkout__billing__container">
                <div className="checkout__billing__info">
                  <label>Month</label>
                  <input type="text" placeholder="Name" />
                </div>

                <div className="checkout__billing__info">
                  <label>Year</label>
                  <input type="text" placeholder="Name" />
                </div>

                <div className="checkout__billing__info">
                  <label>CVC</label>
                  <input type="text" placeholder="CVC" />
                </div>
              </div>
            </div>
            <hr />
            <h5>Billing Address</h5>
            <div className="checkout__address">
              <label>Street 1:</label>
              <input type="text" placeholder="street 1" />
            </div>
            <div className="checkout__address">
              <label>Street 2: </label>
              <input type="text" placeholder="street 2" />
            </div>
            <div className="checkout__address">
              <label>City: </label>
              <input type="text" placeholder="city" />
            </div>
            <div className="checkout__address">
              <label>State: </label>
              <input type="text" placeholder="state" />
            </div>
            <div className="checkout__address">
              <label>Zip: </label>
              <input type="text" placeholder="zip" />
            </div>
            <div className="checkout__address">
              <label>Country: </label>
              <input type="text" placeholder="country" />
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
              <input type="text" placeholder="Name" />
            </div>
            <div className="checkout__address">
              <label>Street 1:</label>
              <input type="text" placeholder="street 1" />
            </div>
            <div className="checkout__address">
              <label>Street 2: </label>
              <input type="text" placeholder="street 2" />
            </div>
            <div className="checkout__address">
              <label>City: </label>
              <input type="text" placeholder="city" />
            </div>
            <div className="checkout__address">
              <label>State: </label>
              <input type="text" placeholder="state" />
            </div>
            <div className="checkout__address">
              <label>Zip: </label>
              <input type="text" placeholder="zip" />
            </div>
            <div className="checkout__address">
              <label>Country: </label>
              <input type="text" placeholder="country" />
            </div>
          </div>
          <div className="checkout__bottom__right">
            <div className="checkout__bottom__info">
              <h4>
                {numDogs} {numDogs === 1 ? "Dog" : "Dogs"}
              </h4>
              <h4>Total: ${grandTotal}</h4>
              <button type="button">Checkout</button>{" "}
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
  fetchCheckout: () => dispatch(fetchCheckout())
});

export default connect(mapState, mapDispatch)(Checkout);
