import React, { Component } from "react";

export default class AddressCard extends Component {
  constructor() {
    super();
  }

  render() {
    const {
      street1,
      street2,
      city,
      zipcode,
      state,
      country,
      type
    } = this.props.address;
    return (
      <div className="AddressCard">
        <div>
          {street1} {street2}
        </div>
        <div>
          {city}, {state}, {zipcode}
        </div>
        <div>{country}</div>
        <div>Type: {type}</div>
      </div>
    );
  }
}
