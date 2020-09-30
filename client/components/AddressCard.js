import React, { Component } from "react";
import { AiFillEdit } from "react-icons/ai";

export default class AddressCard extends Component {
  constructor() {
    super();
  }

  render() {
    const { address, toggleEdit } = this.props;
    const { street1, street2, city, zipcode, state, country, type } = address;
    console.log("toggle Edit", this.props.toggleEdit);
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
        <AiFillEdit onClick={() => toggleEdit(address)} />
      </div>
    );
  }
}
