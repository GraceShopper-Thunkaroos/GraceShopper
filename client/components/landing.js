import React from 'react'
import axios from 'axios'
import LandingAuthForm from './landing-auth-form.js'

export default class Landing extends React.Component {
  constructor() {
    super()
    this.state = {
      productPictures: []
    }
  }

  async componentDidMount() {
    const {data: products} = await axios.get('/api/products/')
    this.setState({productPictures: products.map(elt => elt.picture)})
  }

  render() {
    console.log(this.props, 'history')
    return (
      <div id="LandingPage">
        <div id="productFeed">
          {this.state.productPictures.map(picture => <img src={picture} />)}
        </div>
        <div className="LandingAuthContainer">
          <LandingAuthForm />
        </div>
      </div>
    )
  }
}
