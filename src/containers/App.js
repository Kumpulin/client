import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import MapPage from '../pages/MapPage'

class App extends Component {
  render() {
    return (
      <Router>
        <MapPage />
      </Router>
    )
  }
}

export default App
