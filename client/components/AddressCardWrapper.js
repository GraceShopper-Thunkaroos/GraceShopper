import React, { Component } from "react";
import AddressCard from "./AddressCard";

export default class AddressCardWrapper extends Component {
  constructor() {
    super();
  }

  render() {
    const { address, toggleEdit } = this.props;
    return (
      <div className="AddressCardWrapper">
        {address.map(address => (
          <AddressCard
            key={address.id}
            address={address}
            toggleEdit={toggleEdit}
          />
        ))}
      </div>
    );
  }
}
