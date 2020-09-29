import React, { Component } from "react";
import BillingCard from "./BillingCard";

export default class BillingCardWrapper extends Component {
  constructor() {
    super();
  }

  render() {
    const { address, billing } = this.props;
    return (
      <div className="BillingCardWrapper">
        {billing.map(billing => (
          <BillingCard
            key={billing.id}
            billing={billing}
            addressList={address}
          />
        ))}
      </div>
    );
  }
}
