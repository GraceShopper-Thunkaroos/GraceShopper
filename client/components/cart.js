import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCartItems } from "../store/cart";

class Cart extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.user.id) {
      console.log(this.props.user.id);
      this.props.fetchCartItems(this.props.user.id);
    }
  }

  onSubmit() {
    console.log("Purchase submitted now");
    this.props.history.push("/checkout");
  }

  render() {
    const cartItems = this.props.cartItems;
    const user = this.props.user;
    let totalOrderCost = 0;
    return (
      <div className="user-cart">
        <h3> {user.firstName}'s Cart:</h3>
        {cartItems.length ? (
          cartItems.map(item => {
            const { product, quantity } = item;
            totalOrderCost += parseInt(product.price, 10);
            return (
              <div key={product.id} className="cart-items">
                <h4>Product Name: {product.name}</h4>
                {/* <h4>Product ID:</h4>
                 <h5>{}</h5>
                <h4>Phone Number:</h4>
                <h5>{item.user.phoneNumber}</h5>
                <h4>Expected Delivery Date:</h4>{" "}
                <h5>{item.expectedDeliveryDate}</h5>
                <h4>Additional Instructions:</h4> <h5>{item.instruction}</h5> */}
                <h4>Item Quantity: {quantity}</h4>
                <h4>Item Price: {`$ ${product.price}`}</h4>
              </div>
            );
          })
        ) : (
          <h2>Currently, there are no items in your cart.</h2>
        )}
        <h4> Total Order Cost: </h4> <h5> ${totalOrderCost} </h5>
        <button type="button" onClick={this.onSubmit}>
          Submit Purchase
        </button>
      </div>
    );
  }
}

const mapState = state => {
  console.log("THIS IS MAP STATE ----> , ", state);
  return {
    cartItems: state.cartItems,
    user: state.user
  };
};

const mapDispatch = dispatch => ({
  fetchCartItems: userId => dispatch(fetchCartItems(userId))
});

export default connect(mapState, mapDispatch)(Cart);
