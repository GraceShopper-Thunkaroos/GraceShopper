import React, { Component } from "react";
import AddressCard from "./AddressCard";

export default class AddressCardWrapper extends Component {
  constructor() {
    super();
  }

  render() {
    const { address } = this.props;
    return (
      <div className="AddressCardWrapper">
        {address.map(address => (
          <AddressCard key={address.id} address={address} />
        ))}
      </div>
    );
  }
}
