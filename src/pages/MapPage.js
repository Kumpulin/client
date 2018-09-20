import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import BackIcon from '@material-ui/icons/ArrowBack'
import AddIcon from '@material-ui/icons/Add'
import PersonIcon from '@material-ui/icons/Person'
import classNames from 'classnames'
import compose from 'recompose/compose'
import {
  setCurrentFullPage,
  toggleCreateEventForm,
  setActiveStep,
  toggleUserProfileSidebar
} from '../actions/app'
import { clearTempEventData, toggleUpdateEvent } from '../actions/event'
import Zoom from '@material-ui/core/Zoom'

import Map from '../components/Map'
import Search from '../components/Search'
import CreateEventForm from '../components/CreateEventForm'
import EventDetailSidebar from '../components/EventDetailSidebar'
import UserProfileSidebar from '../components/UserProfileSidebar'
import { Avatar } from '@material-ui/core'

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
  leftTopButtonGroup: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
    position: 'fixed',
    top: theme.spacing.unit * 4,
    left: theme.spacing.unit * 4,
    [theme.breakpoints.down('xs')]: {
      top: theme.spacing.unit * 2,
      left: theme.spacing.unit * 2
    },
    zIndex: 3,
    display: 'flex',
    flexDirection: 'column'
  },
  backButton: {
    backgroundColor: '#ff5d5d',
    color: 'white',
    boxShadow: theme.shadows[2],
    transition: theme.transitions.create('background-color'),
    marginBottom: theme.spacing.unit * 4,
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing.unit * 2
    },
    '&:hover': {
      backgroundColor: '#DF554F'
    }
  },
  userImage: {
    height: theme.spacing.unit * 7,
    width: theme.spacing.unit * 7,
    boxShadow: theme.shadows[2],
    cursor: 'pointer'
  },
  createEventFormButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4,
    [theme.breakpoints.down('xs')]: {
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2
    },
    zIndex: 3,
    backgroundColor: '#ff5d5d',
    color: 'white',
    boxShadow: theme.shadows[2],
    transition: theme.transitions.create('background-color'),
    '&:hover': {
      backgroundColor: '#DF554F'
    }
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100vh',
    width: '100vw',
    zIndex: 3
  },
  hideOverlay: {
    display: 'none'
  }
})

class MapPage extends Component {
  handleUserImageClicked = () => {
    this.props.showUserProfileSidebar()
  }

  render() {
    const {
      classes,
      user,
      currentFullPage,
      backToLandingPage,
      showCreateEventForm,
      isCreateEvent,
      hideCreateEventForm,
      eventDetails,
      isUserImageClicked
    } = this.props

    return (
      <div
        className={classNames([
          classes.page,
          currentFullPage === 'map' && classes.fullPage,
          currentFullPage === 'left' && classes.hidePage
        ])}
      >
        <div className={classes.leftTopButtonGroup}>
          <Zoom in={currentFullPage === 'map' && !isUserImageClicked}>
            <Button
              className={classes.backButton}
              onClick={backToLandingPage}
              variant="fab"
            >
              <BackIcon />
            </Button>
          </Zoom>

          {user && (
            <Zoom
              in={currentFullPage === 'map' && !isUserImageClicked}
              className={classes.userImage}
              onClick={this.handleUserImageClicked}
            >
              {user.image ? (
                <Avatar
                  src={`https://s3-ap-southeast-1.amazonaws.com/kumpulin-images/${
                    user.image
                  }`}
                />
              ) : (
                <Avatar>
                  <PersonIcon />
                </Avatar>
              )}
            </Zoom>
          )}
        </div>
        <UserProfileSidebar />
        <Search />
        {user && (
          <Zoom in={currentFullPage === 'map' && !eventDetails}>
            <Button
              className={classes.createEventFormButton}
              onClick={showCreateEventForm}
              variant="fab"
            >
              <AddIcon />
            </Button>
          </Zoom>
        )}
        {isCreateEvent && currentFullPage === 'map' && <CreateEventForm />}
        <EventDetailSidebar />
        <Map />
        <div
          className={classNames([
            classes.overlay,
            !isCreateEvent && classes.hideOverlay
          ])}
          onClick={hideCreateEventForm}
        />
      </div>
    )
  }
}

MapPage.propTypes = {
  classes: PropTypes.object.isRequired,
  currentFullPage: PropTypes.string,
  user: PropTypes.object,
  isCreateEvent: PropTypes.bool.isRequired,
  showCreateEventForm: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  currentFullPage: state.app.currentFullPage,
  user: state.auth.user,
  isCreateEvent: state.app.isCreateEvent,
  eventDetails: state.event.eventDetails,
  isUserImageClicked: state.app.isUserImageClicked
})

const mapDispatchToProps = dispatch => ({
  backToLandingPage: () => dispatch(setCurrentFullPage(null)),
  showCreateEventForm: () => dispatch(toggleCreateEventForm(true)),
  showUserProfileSidebar: () => dispatch(toggleUserProfileSidebar(true)),
  hideCreateEventForm: () => {
    dispatch(clearTempEventData())
    dispatch(toggleUpdateEvent(false))
    dispatch(toggleCreateEventForm(false))
    dispatch(setActiveStep(0))
  }
})

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(MapPage)
