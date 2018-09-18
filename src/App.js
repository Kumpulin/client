import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Button from '@material-ui/core/Button'
import grey from '@material-ui/core/colors/grey'
import classNames from 'classnames'
import compose from 'recompose/compose'
import Cookies from 'js-cookie'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { fetchUserData } from './actions/auth'

import {
  setCurrentFullPage,
  toggleSignUpForm,
  toggleSignInForm,
  toggleForgotPasswordForm,
  toggleChangePasswordForm
} from './actions/app'

import LeftPage from './pages/LeftPage'
import MapPage from './pages/MapPage'

import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'

const styles = theme => ({
  startExploringButton: {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: theme.spacing.unit * 8,
    [theme.breakpoints.up('lg')]: {
      bottom: theme.spacing.unit * 16
    },
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

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    const token = Cookies.get('token')

    if (token) {
      dispatch(fetchUserData(token))
      dispatch(setCurrentFullPage('map'))
    }
  }

  render() {
    const { classes, setMapPageFull, currentFullPage, width } = this.props

    return (
      <Fragment>
        <CssBaseline />
        <Router>
          <Fragment>
            <LeftPage />
            <MapPage />
            <SignInForm />
            <SignUpForm />
            <Button
              className={classNames([
                classes.startExploringButton,
                currentFullPage !== null &&
                  isWidthUp('lg', width) &&
                  classes.hideStartExploringButton
              ])}
              variant="extendedFab"
              onClick={setMapPageFull}
            >
              Start Exploring!
            </Button>
          </Fragment>
        </Router>
      </Fragment>
    )
  }
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
  setMapPageFull: () => {
    dispatch(toggleSignUpForm(false))
    dispatch(toggleSignInForm(false))
    dispatch(toggleForgotPasswordForm(false))
    dispatch(toggleChangePasswordForm(false))
    dispatch(setCurrentFullPage('map'))
  },
  dispatch
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withWidth(),
  withStyles(styles)
)(App)
