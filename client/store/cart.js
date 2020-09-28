import axios from 'axios'
import history from '../history'

const defaultCart = []

const GET_CART_ITEMS = 'GET_CART_ITEMS'
const CLEAR_CART = 'CLEAR_CART'
const ADDED_TO_CART = 'ADDED_TO_CART'

const SET_CART_ITEMS = 'SET_CART_ITEMS'

const setCartItems = cartItems => {
  return {
    type: SET_CART_ITEMS,
    cartItems
  }
}

const addedToCart = order => {
  return {
    type: ADDED_TO_CART,
    order
  }
}

export const fetchCartItems = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${userId}`)

    // returns an array of objects of the form {product, quantity}
    // quantity in returned object holds order quantity. product holds inventory quantity.

    dispatch(
      setCartItems(
        data.product.map(product => {
          const quantity = product.order_detail.quantity
          delete product.order_detail
          return {product, quantity}
        })
      )
    )
  } catch (error) {
    console.log('Failed to get /api/orders/userId...')
  }
}

export const addItemToCart = (userId, order) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/orders/${userId}`, order)
    dispatch(addedToCart(data[0]))
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
    case ADDED_TO_CART:
      return action.order
    case CLEAR_CART:
      return defaultCart
    default:
      return state
  }
}
