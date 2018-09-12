import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

import MapPage from '../pages/MapPage'

class App extends Component {
  render() {
    return (
      <Fragment>
        <CssBaseline />
        <Router>
          <MapPage />
        </Router>
      </Fragment>
    )
  }
}

export default App
