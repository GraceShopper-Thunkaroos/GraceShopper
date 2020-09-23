import React from 'react'
import {Navbar, ProductCard} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <ProductCard />
    </div>
  )
}

export default App
