import React from "react";
import axios from "axios";
import LandingAuthForm from "./landing-auth-form.js";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { auth, postGuest } from "../store/user";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";

const style1 = {
  display: "flex",
  flexWrap: "nowrap",
  alignItems: "stretch",
  margin: "0 auto",
  marginBottom: "2.5rem",
  padding: 0,
  width: "67%",
  justifyContent: "center"
};

const style2 = {
  flex: 1,
  textAlign: "center"
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
  }

  async componentDidMount() {
    const { data: products } = await axios.get("/api/products/");
    this.setState({ productPictures: products.map(elt => elt.picture) });
  }

  async onSubmit(evt) {
    evt.preventDefault();
    console.log("IN SUBMIT");
    const { email, password, firstName, lastName } = this.state;
    this.props.auth({ email, password, firstName, lastName }, this.state.tab);
    this.setState({ email: "", password: "", firstName: "", lastName: "" });
    if (this.props.user.error) {
      console.log("submit error sadf", this.props.user.error);
    }
  }

  onChange(evt) {
    console.log(evt, evt.target.name, evt.target.value);
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    console.log("landing rendered?!?!");
    if (this.props.user.error) {
      console.log("submit error", this.props.user.error);
    }
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
            <Tabs
              defaultActiveKey="login"
              onSelect={evt => this.setState({ tab: evt })}
              style={style1}
            >
              <Tab eventKey="login" title="Log In" style={style2}>
                <LandingAuthForm
                  email={this.state.email}
                  password={this.state.password}
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                  tab={this.state.tab}
                />
              </Tab>
              <Tab eventKey="signup" title="Sign Up" style={style2}>
                <LandingAuthForm
                  email={this.state.email}
                  password={this.state.password}
                  firstName={this.state.firstName}
                  lastName={this.state.lastName}
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                  tab={this.state.tab}
                />
              </Tab>
              <Tab eventKey="guest" title="Guest" style={style2}>
                <Button
                  variant="primary"
                  style={{ width: "67%", margin: "auto", height: "3.3rem" }}
                  onClick={() => {
                    this.props.postGuest();
                    this.props.history.push("/home");
                  }}
                >
                  Browse dogs as a guest!
                </Button>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  auth: (formData, method) => dispatch(auth(formData, method)),
  postGuest: () => dispatch(postGuest())
});

const mapProps = state => ({
  user: state.user
});

export default connect(mapProps, mapDispatch)(Landing);
