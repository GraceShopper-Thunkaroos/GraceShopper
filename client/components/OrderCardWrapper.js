import React, { Component } from "react";
import OrderCard from "./OrderCard";

export default class OrderCardWrapper extends Component {
  constructor() {
    super();
  }

  render() {
    const { order } = this.props;
    return (
      <div className="OrderCardWrapper">
        {order.map(order => <OrderCard key={order.id} order={order} />)}
      </div>
    );
  }
}
