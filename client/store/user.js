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
  console.log('inside user store auth')
  try {
    // var res = axios.post(`/auth/${method}`, formData)
    // const res = await fetch('/auth/login/', {
    //   method: 'post',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // })
    // res.json().then((body) => console.log(body))

    var res = await axios.post(`/auth/${method}`, formData)
  } catch (authError) {
    console.log(
      'error in user store auth',
      formData,
      method,
      authError,
      authError.response
    )
    return dispatch(getUser({error: authError}))
  }

  try {
    console.log('about to push history in user stoer auth')
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.log('second block auth error')
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
