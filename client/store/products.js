import axios from 'axios'
import {GET_PRODUCTS, getProducts} from './productActions'

//initial state
const defaultProducts = []

// thunk creators to get products
export const fetchProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(getProducts(data))
  } catch (error) {
    console.log('failed to get /api/projects')
  }
}
//products reducers
export default function(state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
