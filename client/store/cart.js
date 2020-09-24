import axios from 'axios'

const defaultCart = {}

const GET_CART_ITEMS = 'GET_CART_ITEMS'

const getCartItems = cartItems => {
  return {
    type: GET_CART_ITEMS,
    cartItems
  }
}

export const fetchCartItems = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/user/${userId}`)
    dispatch(getCartItems(data))
  } catch (error) {
    console.log('Failed to get /api/orders/user/userId.')
  }
}

export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART_ITEMS:
      return action.cartItems
    default:
      return state
  }
}
