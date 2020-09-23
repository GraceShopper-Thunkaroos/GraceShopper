import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {connect} from 'react-redux'

const App = props => {
  const {isLoggedIn} = props
  return (
    <div>
      {isLoggedIn && <Navbar />}
      <Routes />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapState)(App)
