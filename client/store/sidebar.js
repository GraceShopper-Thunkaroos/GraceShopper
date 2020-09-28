import axios from 'axios'
import {GET_ADDITIONAL_PRODUCTS, getAdditionalProducts} from './productActions'

// initial state
const defaultProducts = []

// thunk creators to get products
export const fetchProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(getAdditionalProducts(data))
  } catch (error) {
    console.log('Failed to get /api/products.')
  }
}

// product reducers
export default function(state = defaultProducts, action) {
  switch (action.type) {
    case GET_ADDITIONAL_PRODUCTS:
      return action.sideProducts
    default:
      return state
  }
}
