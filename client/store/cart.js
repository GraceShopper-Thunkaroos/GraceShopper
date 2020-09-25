import axios from 'axios'

const defaultCart = []

const SET_CART_ITEMS = 'SET_CART_ITEMS'

const setCartItems = cartItems => {
  return {
    type: SET_CART_ITEMS,
    cartItems
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

export default function(state = defaultCart, action) {
  switch (action.type) {
    case SET_CART_ITEMS:
      return action.cartItems
    default:
      return state
  }
}
