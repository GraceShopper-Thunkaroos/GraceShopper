import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser, editUserBA, me } from "../store/user";
import UserProfileCard from "./UserProfileCard";
import AddressCard from "./AddressCard";
import BillingCard from "./BillingCard";
import BillingCardWrapper from "./BillingCardWrapper";
import AddressCardWrapper from "./AddressCardWrapper";
import ProfileAddressForm from "./ProfileAddressForm";
import ProfileBillingForm from "./ProfileBillingForm";
import { MdCancel } from "react-icons/md";
import OrderCardWrapper from "./OrderCardWrapper";

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      tab: "address",
      editFormView: false,
      editFormType: "",
      editAddress: {},
      editBilling: {}
    };
    this.tabSelect = this.tabSelect.bind(this);
    this.editAddress = this.editAddress.bind(this);
    this.editBilling = this.editBilling.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
  }

  componentDidMount() {
    this.props.loadInitialData();
  }

  tabSelect(evt) {
    this.setState({ tab: evt.target.dataset.name });
  }

  editAddress(address) {
    this.setState({
      editFormView: true,
      editFormType: "address",
      editAddress: address
    });
  }

  editBilling(billing) {
    this.setState({
      editFormView: true,
      editFormType: "billing",
      editBilling: billing
    });
  }

  cancelForm() {
    this.setState({ editFormView: false });
  }

  onChange(evt) {
    const editFormType = this.state.editFormType;
    const editObjectName =
      "edit" + editFormType[0].toUpperCase() + editFormType.slice(1);
    const editObject = this.state[editObjectName];
    this.setState({
      [editObjectName]: { ...editObject, [evt.target.name]: evt.target.value }
    });
  }

  onSubmit(evt) {
    evt.preventDefault();
    const editFormType = this.state.editFormType;
    const editObjectName =
      "edit" + editFormType[0].toUpperCase() + editFormType.slice(1);
    const editObject = this.state[editObjectName];
    this.props.editUserBA(editFormType, editObject);
  }

  render() {
    const user = this.props.user;
    const {
      address,
      billing,
      order,
      imgUrl,
      firstName,
      lastName,
      phoneNumber,
      email
    } = user;
    address.sort((a, b) => a.id - b.id);
    billing.sort((a, b) => a.id - b.id);
    console.log("orders?", user.order);
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
          {this.state.editFormView &&
            (() => {
              if (this.state.editFormType === "address") {
                return (
                  <React.Fragment>
                    <MdCancel onClick={this.cancelForm} />
                    <ProfileAddressForm
                      address={this.state.editAddress}
                      onChange={this.onChange}
                      onSubmit={this.onSubmit}
                    />
                  </React.Fragment>
                );
              } else if (this.state.editFormType === "billing") {
                return (
                  <React.Fragment>
                    <MdCancel onClick={this.cancelForm} />
                    <ProfileBillingForm
                      billing={this.state.editBilling}
                      onChange={this.onChange}
                      onSubmit={this.onSubmit}
                    />
                  </React.Fragment>
                );
              } else if (this.state.editFormType === "order") {
                return (
                  <React.Fragment>
                    <MdCancel onClick={this.cancelForm} />
                    <ProfileUserForm
                      user={this.props.user}
                      onChange={this.onChange}
                      onSubmit={this.onSubmit}
                    />
                  </React.Fragment>
                );
              }
            })()}
        </div>
        <div className="BillingAddressTable">
          <div className="tabContainer">
            <div
              data-name="address"
              aria-selected={this.state.tab === "address"}
              onClick={this.tabSelect}
            >
              Address
            </div>
            <div
              data-name="billing"
              aria-selected={this.state.tab === "billing"}
              onClick={this.tabSelect}
            >
              Billing
            </div>
            <div
              data-name="order"
              aria-selected={this.state.tab === "order"}
              onClick={this.tabSelect}
            >
              Order
            </div>
          </div>
          {this.state.tab === "billing" ? (
            <BillingCardWrapper
              billing={billing}
              toggleEdit={this.editBilling}
            />
          ) : this.state.tab === "address" ? (
            <AddressCardWrapper
              address={address}
              toggleEdit={this.editAddress}
            />
          ) : (
            <OrderCardWrapper order={order} />
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
  return {
    getUser: user => dispatch(getUser(user)),
    editUserBA: (method, editObject) =>
      dispatch(editUserBA(method, editObject)),
    loadInitialData: () => dispatch(me())
  };
};

export default connect(mapState, mapDispatch)(UserProfile);
