import axios from 'axios'
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

const addedToCart = lineItem => {
  return {}
}

// thunk creators
export const deleteCartItem = productId => async dispatch => {
  try {
    await axios.delete(`/api/orders/${productId}`)
    await dispatch(fetchCartItems())
  } catch (error) {
    console.error(err)
  }
}

export const fetchCartItems = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/cart`)
    console.log(data)

    // returns an array of arrays of the form {product, quantity}
    // quantity in returned object holds order quantity. product holds inventory quantity.
    dispatch(setCartItems(data))
  } catch (error) {
    console.log('FETCH CART ITEMS: Failed to get /api/orders/userId...')
  }
}

export const editCartItem = productId => async dispatch => {
  try {
    await axios.put(`/api/orders/edit/:productId`)
    await dispatch(fetchCartItems())
  } catch (error) {
    console.log('Failed to get /api/orders/userId...')
  }
}

export const addItemToCart = (product, quantity) => async dispatch => {
  try {
    console.log('product id in addItemToCart', product.id)
    await axios.post(`/api/orders/add/${product.id}`, {quantity})
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
