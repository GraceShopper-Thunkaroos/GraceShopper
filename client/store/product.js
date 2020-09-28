import axios from 'axios'
import {
  GET_PRODUCT,
  getProduct,
  getAdditionalProducts,
  setProduct,
  SET_PRODUCT
} from './productActions'

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

export const setNewProduct = productId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${productId}`)
    dispatch(setProduct(data))
  } catch (error) {
    console.log('Failed to get /api/product/id.')
  }
}

export const fetchAdditionalProduct = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/retrieve`)
    dispatch(getAdditionalProducts(data))
  } catch (error) {
    console.log('Failed to get /api/product/retrieve.')
  }
}

// product reducers
export default function(state = defaultProduct, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    case SET_PRODUCT:
      return action.product
    default:
      return state
  }
}
