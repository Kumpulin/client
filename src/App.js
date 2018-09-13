import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Button from '@material-ui/core/Button'

import LeftPage from './pages/LeftPage'
import MapPage from './pages/MapPage'

import SignInForm from './components/SignInForm'

const styles = theme => ({
  startExploringButton: {
    position: 'fixed',
    left: '50%',
    right: '50%',
    transform: 'translate(-50%, -50%)',
    bottom: theme.spacing.unit * 16,
    width: theme.spacing.unit * 24,
    color: '#ff5d5d',
    backgroundColor: 'white',
  }
})

class App extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    const { classes } = this.props

    return (
      <Fragment>
        <CssBaseline />
        <Router>
          <Fragment>
            <LeftPage />
            <MapPage />
            <SignInForm />
            <Button className={classes.startExploringButton} variant="extendedFab">Start Exploring!</Button>
          </Fragment>
        </Router>
      </Fragment>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(App)
