import React from "react";
import AuthForm from "./AuthForm";
import { auth, deleteError } from "../store/user";
import { connect } from "react-redux";

class PageLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      productPictures: [],
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      tab: "login"
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.deleteError();
  }

  async onSubmit(evt) {
    evt.preventDefault();
    const { email, password, firstName, lastName } = this.state;
    this.props.auth({ email, password, firstName, lastName }, "login");
    this.setState({ email: "", password: "", firstName: "", lastName: "" });
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    return (
      <div className="PageAuthForm">
        <div className="FormHeader">Log In</div>
        <AuthForm
          email={this.state.email}
          password={this.state.password}
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          formType="login"
          errorMessage={this.props.user.error}
          guestButton={false}
        />
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  auth: (formData, method) => dispatch(auth(formData, method)),
  deleteError: () => dispatch(deleteError())
});

const mapProps = state => ({
  user: state.user
});

export default connect(mapProps, mapDispatch)(PageLogin);
