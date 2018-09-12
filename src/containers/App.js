import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

import LeftPage from '../pages/LeftPage'
import MapPage from '../pages/MapPage'

class App extends Component {
  render() {
    return (
      <Fragment>
        <CssBaseline />
        <Router>
          <Fragment>
            <LeftPage />
            <MapPage />
          </Fragment>
        </Router>
      </Fragment>
    )
  }
}

export default App
