import React, { Component } from "react";

export default class BillingCard extends Component {
  constructor() {
    super();
  }

  render() {
    const { addressList, billing } = this.props;
    let { cardNumber, expirationDate } = billing;
    expirationDate = new Date(expirationDate);
    const [expMonth, expYear] = [
      expirationDate.getMonth() + 1,
      expirationDate.getFullYear()
    ];
    return (
      <div className="BillingCard">
        <div>Card ending in: {cardNumber.slice(-4)}</div>
        <div>Expires: {`${expMonth}/${expYear}`}</div>
        <select>
          {addressList.map(address => {
            const { street1, street2, city, state, country } = address;
            return (
              <option
                value={address.id}
              >{`${street1} ${street2} ${city} ${state} ${country}`}</option>
            );
          })}
        </select>
      </div>
    );
  }
}
