import React from "react";
import axios from "axios";
import LandingAuthForm from "./landing-auth-form.js";

export default class Landing extends React.Component {
  constructor() {
    super();
    this.state = {
      productPictures: []
    };
  }

  async componentDidMount() {
    const { data: products } = await axios.get("/api/products/");
    this.setState({ productPictures: products.map(elt => elt.picture) });
  }

  render() {
    console.log(this.props, "history");
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
          <LandingAuthForm />
        </div>
      </div>
    );
  }
}
