import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCartItems } from "../store/cart";

class Cart extends Component {
  componentDidMount() {}

  componentDidUpdate(oldProps) {
    if (oldProps !== this.props) {
      console.log(oldProps);
      console.log(this.props);
      console.log("ran");
      this.props.fetchCartItems(this.props.user.id);
    }
  }

  onSubmit() {
    console.log("Purchase submitted now");
  }

  render() {
    const cartItems = this.props.cartItems;
    let cartIndicator = false;
    let orderName = "";
    if (cartItems[0] !== undefined) {
      cartIndicator = true;
      orderName = cartItems[0].user.name;
    }
    let totalOrderCost = 0;
    return (
      <div className="user-cart">
        <h3> {orderName}'s Cart:</h3>
        {cartIndicator ? (
          cartItems.map(item => {
            totalOrderCost += parseInt(item.totalPrice, 10);
            return (
              <div key={item.id} className="cart-items">
                <h4>Product ID:</h4>
                <h5>{}</h5>
                <h4>Phone Number:</h4>
                <h5>{item.user.phoneNumber}</h5>
                <h4>Expected Delivery Date:</h4>{" "}
                <h5>{item.expectedDeliveryDate}</h5>
                <h4>Additional Instructions:</h4> <h5>{item.instruction}</h5>
                <h4>Item Quantity:</h4>
                <h5>{}</h5>
                <h4>Item Price:</h4>
                <h5>${item.totalPrice}</h5>
              </div>
            );
          })
        ) : (
          <h2>Currently, there are no items in your cart.</h2>
        )}
        <h4> Total Order Cost: </h4> <h5> ${totalOrderCost} </h5>
        <button type="submit" onSubmit={this.onSubmit}>
          {" "}
          Submit Purchase{" "}
        </button>
      </div>
    );
  }
}

const mapState = state => {
  console.log(state);
  return {
    cartItems: state.cartItems,
    user: state.user
  };
};

const mapDispatch = dispatch => ({
  fetchCartItems: userId => dispatch(fetchCartItems(userId))
});

export default connect(mapState, mapDispatch)(Cart);
