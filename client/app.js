import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import {connect} from 'react-redux'

const App = props => {
  const {accessGranted, isLoggedIn, cartItems, users} = props
  return (
    <div>
      {accessGranted && <Navbar />}
      <Routes />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log('MAPING STATE --> ', state)
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    accessGranted: !!state.user.id || !!state.user.guest,
    isLoggedIn: !!state.user.id,
    cartItems: state.cartItems,
    user: state.user
  }
}

export default connect(mapState)(App)
