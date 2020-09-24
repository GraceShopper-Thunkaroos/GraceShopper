import axios from 'axios'
import {GET_PRODUCT, getProduct} from './productActions'

// initial state
const defaultProduct = []

// thunk creator
export const fetchProduct = productId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${productId}`)
    dispatch(getProduct(data))
  } catch (error) {
    console.log('Failed to get /api/product.')
  }
}

// product reducers
export default function(state = defaultProduct, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return state
  }
}
