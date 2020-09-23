import React, {Component} from 'react'
import {connect} from 'react-redux'
import {FaDog} from 'react-icons/fa'

const sample = {
  name: 'Brody',
  breed: 'Eskimo',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure',
  quantity: 1,
  price: 300,
  picture: 'https://images.dog.ceo/breeds/eskimo/n02109961_1017.jpg'
}

export class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputField: 1
    }
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    return (
      <div className="singleProduct">
        <div className="singleProduct__container">
          <div className="singleProduct__container__left">
            <img src={sample.picture} alt="" />
          </div>
          <div className="singleProduct__container__right">
            <h1>{sample.name}</h1>
            <div className="singleProduct__price">
              <h4>${sample.price}</h4>
              <h4>${sample.price + sample.price * 0.8}</h4>
            </div>

            <div className="singleProduct__quantity__input">
              <label>Quantity </label>{' '}
              <input
                name="inputField"
                type="number"
                value={this.state.inputField}
                onChange={this.onChange}
              />
            </div>
            <button type="button">
              Add To Cart {'  '}
              <FaDog />
            </button>
            <hr />
            <h3>{sample.description}</h3>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
