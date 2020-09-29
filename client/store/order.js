import axios from 'axios'
import {Next} from 'react-bootstrap/esm/PageItem'

const GET_ORDER = 'GET_ORDER'
const GET_CHECKOUT = 'GET_CHECKOUT'

const initialState = []

const getOrder = order => ({
  type: GET_ORDER,
  order
})

const getCheckout = order => ({
  type: GET_CHECKOUT,
  order
})

//get order from a specific user
export const fetchOrder = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${userId}`)
    dispatch(getOrder(data))
  } catch (error) {
    console.log('failed to get api/orders/:id')
  }
}

export const fetchCheckout = () => async dispatch => {
  try {
    const {data: order} = await axios.get(`/api/orders/cart`)
    dispatch(getCheckout(order))
  } catch (error) {
    console.log('failed to get api/cart')
  }
}

// store, added it to index as well
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    case GET_CHECKOUT:
      return action.order
    default:
      return state
  }
}
