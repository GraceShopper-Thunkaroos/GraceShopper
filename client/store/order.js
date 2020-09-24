import axios from 'axios'

const GET_ORDER = 'GET_ORDER'

const initialState = []

const getOrder = order => ({
  type: GET_ORDER,
  order
})

//get order from a specific user
export const fetchOrder = userId => dispatch => {
  try {
    const {data} = axios.get(`/api/orders/${userId}`)
    dispatch(getOrder(data))
  } catch (error) {
    console.log('failed to get api/orders/:id')
  }
}
// store, added it to index as well
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    default:
      return state
  }
}
