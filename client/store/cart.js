import axios from 'axios'
import {remove} from 'lodash'
import history from '../history'

// initial state
const defaultCart = []

// action constants
const GET_CART_ITEMS = 'GET_CART_ITEMS'
const CLEAR_CART = 'CLEAR_CART'
const ADDED_TO_CART = 'ADDED_TO_CART'
const SET_CART_ITEMS = 'SET_CART_ITEMS'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'

// action creators
const setCartItems = cartItems => {
  return {
    type: SET_CART_ITEMS,
    cartItems
  }
}

const removeItem = productId => {
  return {
    type: REMOVE_CART_ITEM,
    productId
  }
}

// const addedToCart = lineItem => {
//   return {}
// }

// thunk creators
export const deleteCartItem = productId => async dispatch => {
  try {
    await axios.delete(`/api/orders/${productId}`)
    await dispatch(fetchCartItems())
    dispatch(removeItem(productId))
  } catch (error) {
    console.error(err)
  }
}

export const fetchCartItems = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/cart`)

    // returns an array of arrays of the form {product, quantity}
    // quantity in returned object holds order quantity. product holds inventory quantity.
    dispatch(setCartItems(data))
  } catch (error) {
    console.log('FETCH CART ITEMS: Failed to get /api/orders/userId...')
  }
}

export const purchaseCart = (
  instruction,
  billing,
  billingAddress,
  shipAddress
) => async dispatch => {
  try {
    await axios.post('/api/orders/purchase', {
      instruction,
      billing,
      billingAddress,
      shipAddress
    })
  } catch (error) {
    console.error(error)
  }
}

export const editCartItem = productId => async dispatch => {
  try {
    await axios.put(`/api/orders/:productId`)
    await dispatch(fetchCartItems())
  } catch (error) {
    console.log('Failed to get /api/orders/userId...')
  }
}

export const addItemToCart = (product, quantity) => async dispatch => {
  try {
    await axios.post(`/api/orders/${product.id}`, {quantity})
    await dispatch(fetchCartItems())
  } catch (error) {
    console.log('Failed to post to /api/orders/userId...')
  }
}

export const newCart = cart => async dispatch => {
  try {
    const {data} = await axios.post('api/orders', cart)
    dispatch(clearC)
  } catch (error) {
    console.log('failed to get /api/orders')
  }
}

export default function(state = defaultCart, action) {
  switch (action.type) {
    case SET_CART_ITEMS:
      return action.cartItems
    case CLEAR_CART:
      return defaultCart
    default:
      return state
  }
}
