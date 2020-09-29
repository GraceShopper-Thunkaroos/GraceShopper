import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const SET_GUEST = 'SET_GUEST'
const DELETE_ERROR = 'DELETE_ERROR'

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
export const deleteError = () => ({type: DELETE_ERROR})
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

// export const userProfile = () => async (dispatch, getState) => {
//   try {
//     const {data: userProfile} = await axios.get('/api/users/{}')
//   } catch (err) {
//     console.error(err)
//   }
// }

export const auth = (formData, method) => async dispatch => {
  try {
    var res = await axios.post(`/auth/${method}`, formData)
  } catch (authError) {
    var errorMessage = authError.response.data
    if (errorMessage === 'User already exists') {
      errorMessage = 'An account with that email exists already.'
    } else if (errorMessage.includes('Validation error')) {
      errorMessage = 'Sign up failed. Please try again with another email.'
    }
    return dispatch(getUser({error: errorMessage}))
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
    case DELETE_ERROR:
      delete state.error
      return state
    default:
      return state
  }
}
