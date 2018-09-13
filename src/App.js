import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Button from '@material-ui/core/Button'
import grey from '@material-ui/core/colors/grey'
import classNames from 'classnames'

import { setCurrentFullPage } from './actions/app'

import LeftPage from './pages/LeftPage'
import MapPage from './pages/MapPage'

const styles = theme => ({
  startExploringButton: {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: theme.spacing.unit * 16,
    width: theme.spacing.unit * 24,
    color: '#ff5d5d',
    backgroundColor: 'white',
    boxShadow: theme.shadows[2],
    transition: theme.transitions.create(['transform', 'box-shadow']),
    '&:hover': {
      boxShadow: theme.shadows[4],
      backgroundColor: grey[50]
    }
  },
  hideStartExploringButton: {
    transform: `translate(-50%, ${theme.spacing.unit * 24}px)`
  }
})

function App ({ classes, setMapPageFull, currentFullPage }) {
  return (
    <Fragment>
      <CssBaseline />
      <Router>
        <Fragment>
          <LeftPage />
          <MapPage />
          <Button className={classNames([classes.startExploringButton, currentFullPage !== null && classes.hideStartExploringButton])} variant="extendedFab" onClick={setMapPageFull}>Start Exploring!</Button>
        </Fragment>
      </Router>
    </Fragment>
  )
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  setMapPageFull: PropTypes.func.isRequired,
  currentFullPage: PropTypes.string
}

const mapStateToProps = state => ({
  currentFullPage: state.app.currentFullPage
})

const mapDispatchToProps = dispatch => ({
  setMapPageFull: () => dispatch(setCurrentFullPage('map'))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App))
