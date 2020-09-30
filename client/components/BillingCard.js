import React, { Component } from "react";
import { AiFillEdit } from "react-icons/ai";

export default class BillingCard extends Component {
  constructor() {
    super();
  }

  render() {
    const { billing, toggleEdit } = this.props;
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
        <AiFillEdit onClick={() => toggleEdit(billing)} />
      </div>
    );
  }
}
