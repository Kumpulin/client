import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import BackIcon from '@material-ui/icons/ArrowBack'
import AddIcon from '@material-ui/icons/Add'
import classNames from 'classnames'
import compose from 'recompose/compose'
import { setCurrentFullPage } from '../actions/app'
import Zoom from '@material-ui/core/Zoom'

import Map from '../components/Map'
import Search from '../components/Search'

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
  backButton: {
    position: 'fixed',
    top: theme.spacing.unit * 4,
    left: theme.spacing.unit * 4,
    zIndex: 3,
    backgroundColor: '#ff5d5d',
    color: 'white',
    boxShadow: theme.shadows[2]
  },
  createEventFormButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4,
    zIndex: 3,
    backgroundColor: '#ff5d5d',
    color: 'white',
    boxShadow: theme.shadows[2]
  }
})

function Page({ classes, user, currentFullPage, backToLandingPage }) {
  return (
    <div
      className={classNames([
        classes.page,
        currentFullPage === 'map' && classes.fullPage,
        currentFullPage === 'left' && classes.hidePage
      ])}
    >
      <Zoom in={currentFullPage === 'map'}>
        <Button
          className={classes.backButton}
          onClick={backToLandingPage}
          variant="fab"
        >
          <BackIcon />
        </Button>
      </Zoom>
      <Search />
      <Zoom in={currentFullPage === 'map'}>
        <Button className={classes.createEventFormButton} variant="fab">
          <AddIcon />
        </Button>
      </Zoom>
      {/* <Map /> */}
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

const mapDispatchToProps = dispatch => ({
  backToLandingPage: () => dispatch(setCurrentFullPage(null))
})

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Page)
