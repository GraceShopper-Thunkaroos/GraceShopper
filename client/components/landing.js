import React from "react";
import axios from "axios";
import LandingAuthForm from "./landing-auth-form.js";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { auth, setGuest } from "../store/user";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

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
      password: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    // if (this.user.props) {
    //   console.log("exist");
    // }
    const { data: products } = await axios.get("/api/products/");
    this.setState({ productPictures: products.map(elt => elt.picture) });
  }

  async onSubmit(evt) {
    evt.preventDefault();
    this.props.auth(this.state.email, this.state.password);
  }

  onChange(evt) {
    // console.log(evt, evt.target.name, evt.target.value);
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    console.log("landing rendered?!?!");
    return (
      <div id="LandingPage">
        <div id="productImageFeed_Wrapper">
          <div className="ProductImageFeed_ColumnWrapper pos1">
            <div className="ProductImageFeed_Column">
              {this.state.productPictures
                .slice(0, 9)
                .map(picture => <img src={picture} />)}
              {this.state.productPictures
                .slice(0, 9)
                .map(picture => <img src={picture} />)}
            </div>
          </div>
          <div className="ProductImageFeed_ColumnWrapper pos2">
            <div className="ProductImageFeed_Column">
              {this.state.productPictures
                .slice(9, 18)
                .map(picture => <img src={picture} />)}
            </div>
            <div className="ProductImageFeed_Column 2">
              {this.state.productPictures
                .slice(9, 18)
                .map(picture => <img src={picture} />)}
            </div>
          </div>
          <div className="ProductImageFeed_ColumnWrapper pos3">
            <div className="ProductImageFeed_Column">
              {this.state.productPictures
                .slice(18, 27)
                .map(picture => <img src={picture} />)}
            </div>
            <div className="ProductImageFeed_Column 2">
              {this.state.productPictures
                .slice(18, 27)
                .map(picture => <img src={picture} />)}
            </div>
          </div>
          <div className="ProductImageFeed_ColumnWrapper pos4">
            <div className="ProductImageFeed_Column">
              {this.state.productPictures
                .slice(27, 36)
                .map(picture => <img src={picture} />)}
            </div>
            <div className="ProductImageFeed_Column 2">
              {this.state.productPictures
                .slice(27, 36)
                .map(picture => <img src={picture} />)}
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
              defaultActiveKey="profile"
              id="uncontrolled-tab-example"
              onSelect={() => console.log("clicking tab")}
              style={style1}
            >
              <Tab eventKey="home" title="Log In" style={style2}>
                <LandingAuthForm
                  email={this.state.email}
                  password={this.state.password}
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                />
              </Tab>
              <Tab eventKey="profile" title="Sign Up" style={style2}>
                <LandingAuthForm
                  email={this.state.email}
                  password={this.state.password}
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                />
              </Tab>
              <Tab eventKey="guest" title="Guest" style={style2}>
                <Button
                  variant="primary"
                  style={{ width: "67%", margin: "auto", height: "3.3rem" }}
                  onClick={() => {
                    this.props.setGuest();
                    this.props.history.push("/home");
                  }}
                >
                  Browse dogs as a guest!
                </Button>
              </Tab>
            </Tabs>
            {/* <LandingAuthForm /> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  auth: (email, password) => dispatch(auth(email, password, "login")),
  setGuest: () => dispatch(setGuest())
});

const mapProps = state => ({
  user: state.user
});

export default connect(mapProps, mapDispatch)(Landing);
