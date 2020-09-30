import React, { Component } from "react";
import BillingCard from "./BillingCard";

export default class BillingCardWrapper extends Component {
  constructor() {
    super();
  }

  render() {
    const { billing, toggleEdit } = this.props;
    return (
      <div className="BillingCardWrapper">
        {billing.map(billing => (
          <BillingCard
            key={billing.id}
            billing={billing}
            toggleEdit={toggleEdit}
          />
        ))}
      </div>
    );
  }
}
