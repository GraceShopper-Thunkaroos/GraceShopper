import React, { Component } from "react";

export default class UserProfileCard extends Component {
  constructor() {
    super();
  }

  render() {
    const { imgUrl, firstName, lastName, phoneNumber, email } = this.props;
    return (
      <div className="UserProfileCard">
        <img src={imgUrl} />
        <div className="CardInformation">
          <div>Name: {`${firstName} ${lastName}`}</div>
          <div>Phone Numer: {phoneNumber}</div>
          <div>Email: {email}</div>
        </div>
      </div>
    );
  }
}
