import React, { Component } from "react";
import { AiFillEdit } from "react-icons/ai";
import axios from "axios";

export default class OrderCard extends Component {
  constructor() {
    super();
    this.state = {
      purchaseDate: "",
      expectedDeliveryDate: "",
      instruction: "",
      product: [],
      cost: 0
    };
  }

  async componentDidMount() {
    const { data } = await axios.get(`/api/orders/${this.props.order.id}`);
    console.log("retrieved order data", data);
    const cost = data.product.reduce(
      (acc, elt) =>
        parseInt(elt.order_detail.quantity) * parseInt(elt.price) + acc,
      0
    );
    this.setState({ ...data, cost });
  }

  render() {
    const { order } = this.props;
    // if ()
    // var { street1, street2, city, zipcode, state, country, type } = address;
    return (
      <div className="OrderCard">
        <div>Purchase Date: {this.state.purchaseDate}</div>
        <div>Expected Delivery Date: {this.state.expectedDeliveryDate}</div>
        <div>Special Delivery Instruction: {this.state.instruction} </div>
        <div>Cost: ${this.state.cost}</div>
      </div>
    );
  }
}
