import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const SET_GUEST = 'SET_GUEST'

/**
 * INITIAL STATE
 */
const defaultUser = {}
const guestUser = {
  firstName: 'Guest',
  lastName: '',
  guest: true
}
/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
export const setGuest = () => ({type: SET_GUEST})

/**
 * THUNK CREATORS
 */
export const postGuest = () => async dispatch => {
  try {
    await axios.post('/auth/login', guestUser)
    dispatch(setGuest())
  } catch (err) {
    console.error(err)
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}
console.log('IS THIS RUNNING')
export const auth = (formData, method) => async dispatch => {
  try {
    var res = await axios.post(`/auth/${method}`, formData)
  } catch (authError) {
    return dispatch(getUser({error: authError.response.data}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case SET_GUEST:
      return guestUser
    default:
      return state
  }
}
