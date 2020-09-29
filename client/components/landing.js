import React from "react";
import axios from "axios";
import AuthForm from "./AuthForm";
import { auth, postGuest, deleteError } from "../store/user";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

const tabContainerStyle = {
  display: "flex",
  flexWrap: "nowrap",
  alignItems: "stretch",
  margin: "0 auto",
  marginBottom: "2.5rem",
  padding: 0,
  width: "90%",
  justifyContent: "center",
  height: "4vw"
};

class Landing extends React.Component {
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
    this.tabSelect = this.tabSelect.bind(this);
    this.guestLogin = this.guestLogin.bind(this);
  }

  async componentDidMount() {
    const { data: products } = await axios.get("/api/products/");
    this.setState({ productPictures: products.map(elt => elt.picture) });
  }

  guestLogin() {
    this.props.postGuest();
    this.props.history.push("/home");
  }

  tabSelect(evt) {
    console.log(
      evt,
      evt.target,
      evt.target.name,
      evt.target.dataset.name,
      "tabSelect"
    );
    this.setState({ tab: evt.target.dataset.name });
    this.props.deleteError();
  }

  async onSubmit(evt) {
    evt.preventDefault();
    const { email, password, firstName, lastName } = this.state;
    this.props.auth({ email, password, firstName, lastName }, this.state.tab);
    this.setState({ email: "", password: "", firstName: "", lastName: "" });
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    console.log("landing state", this.state);
    return (
      <div id="LandingPage">
        <div id="productImageFeed_Wrapper">
          <div className="ProductImageFeed_ColumnWrapper pos1">
            <div className="ProductImageFeed_Column">
              {this.state.productPictures
                .slice(0, 9)
                .map(picture => <img key={picture} src={picture} />)}
              {this.state.productPictures
                .slice(0, 9)
                .map(picture => <img key={picture} src={picture} />)}
            </div>
          </div>
          <div className="ProductImageFeed_ColumnWrapper pos2">
            <div className="ProductImageFeed_Column">
              {this.state.productPictures
                .slice(9, 18)
                .map(picture => <img key={picture} src={picture} />)}
            </div>
            <div className="ProductImageFeed_Column 2">
              {this.state.productPictures
                .slice(9, 18)
                .map(picture => <img key={picture} src={picture} />)}
            </div>
          </div>
          <div className="ProductImageFeed_ColumnWrapper pos3">
            <div className="ProductImageFeed_Column">
              {this.state.productPictures
                .slice(18, 27)
                .map(picture => <img key={picture} src={picture} />)}
            </div>
            <div className="ProductImageFeed_Column 2">
              {this.state.productPictures
                .slice(18, 27)
                .map(picture => <img key={picture} src={picture} />)}
            </div>
          </div>
          <div className="ProductImageFeed_ColumnWrapper pos4">
            <div className="ProductImageFeed_Column">
              {this.state.productPictures
                .slice(27, 36)
                .map(picture => <img key={picture} src={picture} />)}
            </div>
            <div className="ProductImageFeed_Column 2">
              {this.state.productPictures
                .slice(27, 36)
                .map(picture => <img key={picture} src={picture} />)}
            </div>
          </div>
        </div>
        <div className="LandingAuthContainer">
          <div className="LandingAuthWrapper">
            <div className="AuthFormHeader">
              <img src="https://images.creativemarket.com/0.1.0/ps/2067197/300/200/m2/fpnw/wm0/drd-.png?1482770793&s=64577ab8ec60ccd4280a6f7f0068689b" />
              <span>Doctor Pup</span>
            </div>
            <div className="tabContainer">
              <div
                data-name="login"
                aria-selected={this.state.tab === "login"}
                onClick={this.tabSelect}
              >
                Log In
              </div>
              <div
                data-name="signup"
                aria-selected={this.state.tab === "signup"}
                onClick={this.tabSelect}
              >
                Sign Up
              </div>
            </div>
            <AuthForm
              email={this.state.email}
              password={this.state.password}
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              formType={this.state.tab}
              errorMessage={this.props.user.error}
              guestLogin={this.guestLogin}
              guestButton={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  auth: (formData, method) => dispatch(auth(formData, method)),
  postGuest: () => dispatch(postGuest()),
  deleteError: () => dispatch(deleteError())
});

const mapProps = state => ({
  user: state.user
});

export default connect(mapProps, mapDispatch)(Landing);
