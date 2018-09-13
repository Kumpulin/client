import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import BackIcon from '@material-ui/icons/ArrowBack'
import AddIcon from '@material-ui/icons/Add'
import classNames from 'classnames'
import compose from 'recompose/compose'

import Map from '../components/Map'

const styles = theme => ({
  page: {
    position: 'fixed',
    top: '0',
    bottom: '0',
    height: '100%',
    width: '100%',
    transition: theme.transitions.create(['transform']),
    transform: 'translateX(100vw)',
    [theme.breakpoints.up('lg')]: {
      transform: 'translateX(50vw)'
    }
  },
  hidePage: {
    transform: 'translateX(100vw)'
  },
  fullPage: {
    transform: 'translateX(0)'
  },
  avatar: {
    position: 'fixed',
    top: theme.spacing.unit * 4,
    left: theme.spacing.unit * 4,
    height: theme.spacing.unit * 6,
    width: theme.spacing.unit * 6,
    zIndex: 3
  },
  backButton: {
    position: 'fixed',
    top: theme.spacing.unit * 4,
    left: theme.spacing.unit * 4,
    zIndex: 3,
    backgroundColor: '#ff5d5d',
    color: 'white',
    boxShadow: theme.shadows[2],
    transition: theme.transitions.create(['transform'])
  },
  hideBackButton: {
    transform: `translateY(calc(-100% + -${theme.spacing.unit * 6}px))`
  },
  createEventFormButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4,
    zIndex: 3,
    backgroundColor: '#ff5d5d',
    color: 'white',
    boxShadow: theme.shadows[2],
    transition: theme.transitions.create(['transform'])
  },
  hidecreateEventFormButton: {
    transform: `translateY(calc(100% + ${theme.spacing.unit * 6}px))`
  }
})

function Page({ classes, user, currentFullPage }) {
  return (
    <div
      className={classNames([
        classes.page,
        currentFullPage === 'map' && classes.fullPage,
        currentFullPage === 'left' && classes.hidePage
      ])}
    >
      <Button
        className={classNames([
          classes.backButton,
          currentFullPage !== 'map' && classes.hideBackButton
        ])}
        variant="fab"
      >
        <BackIcon />
      </Button>
      <Button
        className={classNames([
          classes.createEventFormButton,
          currentFullPage !== 'map' && classes.hidecreateEventFormButton
        ])}
        variant="fab"
      >
        <AddIcon />
      </Button>
      <Map />
    </div>
  )
}

Page.propTypes = {
  classes: PropTypes.object.isRequired,
  currentFullPage: PropTypes.string,
  user: PropTypes.object
}

const mapStateToProps = state => ({
  currentFullPage: state.app.currentFullPage,
  user: state.auth.user
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(Page)
