import React, { Component } from "react";
import { connect } from "react-redux";
import UserProfileCard from "./UserProfileCard";
import AddressCard from "./AddressCard";
import BillingCard from "./BillingCard";
import BillingCardWrapper from "./BillingCardWrapper";
import AddressCardWrapper from "./AddressCardWrapper";
import ProfileBAForm from "./ProfileBAForm";

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      tab: "billing"
    };
    this.tabSelect = this.tabSelect.bind(this);
  }

  tabSelect(evt) {
    this.setState({ tab: evt.target.dataset.name });
  }

  render() {
    console.log(this.props.user);
    const user = this.props.user;
    const {
      address,
      billing,
      imgUrl,
      firstName,
      lastName,
      phoneNumber,
      email
    } = user;
    return (
      <div id="UserProfile">
        <div className="UserProfileLeft">
          <UserProfileCard
            imgUrl={imgUrl}
            firstName={firstName}
            lastName={lastName}
            phoneNumber={phoneNumber}
            email={email}
          />
          <ProfileBAForm />
        </div>
        <div className="BillingAddressTable">
          <div className="tabContainer">
            <div
              data-name="billing"
              aria-selected={this.state.tab === "billing"}
              onClick={this.tabSelect}
            >
              Billing
            </div>
            <div
              data-name="address"
              aria-selected={this.state.tab === "address"}
              onClick={this.tabSelect}
            >
              Address
            </div>
          </div>
          {this.state.tab === "billing" ? (
            <BillingCardWrapper address={address} billing={billing} />
          ) : (
            <AddressCardWrapper address={address} />
          )}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(UserProfile);
