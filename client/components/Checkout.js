import axios from "axios";
import React, { Component } from "react";
import { fetchOrder } from "../store/order";
import { connect } from "react-redux";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderComplete: false
    };
    this.successPayment = this.successPayment.bind(this);
  }
  // componentDidMount() {
  //     this.props.fetchOrder(this.props.match.params.id)
  // }
  successPayment() {
    this.setState({
      orderComplete: true
    });

    // errorPayment(data) {
    //     alert('Payment error')
    // }
  }

  render() {
    console.log(this);
    return (
      <div id="checkout-page">
        <h1> checkout out page </h1>
        <div className="Checkout-page">
          {/* {cartItem.map(item => {
                return <Cart key={cartItem.id} cartItem={cartItem} />
            })} */}
        </div>
      </div>
    );
  }
}

export default connect(null, null)(Checkout);
