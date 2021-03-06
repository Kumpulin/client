import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Slide from '@material-ui/core/Slide'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ClockIcon from '@material-ui/icons/AccessTime'
import CalendarIcon from '@material-ui/icons/CalendarToday'
import PlaceIcon from '@material-ui/icons/Place'
import AddIcon from '@material-ui/icons/Add'
import classNames from 'classnames'
import format from 'date-fns/format'
import { toggleEventDetailSidebar, toggleCreateEventForm } from '../actions/app'
import {
  fetchCurrentEventDetails,
  joinEvent,
  toggleUpdateEvent
} from '../actions/event'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import EditIcon from '@material-ui/icons/Edit'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  sidebar: {
    position: 'fixed',
    right: theme.spacing.unit * 4,
    top: theme.spacing.unit * 4,
    bottom: theme.spacing.unit * 4,
    zIndex: 5,
    width: theme.spacing.unit * 48,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  eventHeader: {
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'center',
    height: theme.spacing.unit * 24,
    position: 'relative'
  },
  eventImage: {
    minWidth: '100%'
  },
  editButton: {
    position: 'absolute',
    top: theme.spacing.unit * 3,
    right: theme.spacing.unit * 3
  },
  content: {
    padding: theme.spacing.unit * 4,
    paddingBottom: 0,
    flex: 1,
    overflowY: 'scroll'
  },
  contentHeader: {
    marginBottom: theme.spacing.unit * 2
  },
  sectionTitle: {
    fontWeight: 'bold'
  },
  eventCreator: {
    color: '#ccc',
    fontWeight: 'lighter'
  },
  iconWithText: {
    display: 'flex',
    alignItems: 'center',
    color: '#ccc',
    marginTop: theme.spacing.unit * 2
  },
  iconText: {
    marginLeft: theme.spacing.unit,
    color: '#ccc'
  },
  description: {
    marginTop: theme.spacing.unit * 2
  },
  descriptionTitle: {
    marginBottom: theme.spacing.unit
  },
  descriptionText: {
    color: '#aaa',
    lineHeight: theme.spacing.unit * 0.25,
    fontSize: theme.spacing.unit * 2,
    wordBreak: 'break-word'
  },
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing.unit * 4
  },
  button: {
    boxShadow: 'none'
  },
  joinButton: {
    backgroundColor: '#ff5d5d',
    color: 'white',
    marginRight: theme.spacing.unit * 2,
    '&:hover': {
      backgroundColor: '#DF554F'
    }
  },
  attendeesCounter: {
    flex: 1,
    height: theme.spacing.unit * 7
  },
  incrementedCounter: {
    backgroundColor: '#ff5d5d !important',
    color: 'white !important'
  },
  contentCentered: {
    padding: theme.spacing.unit * 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
})

class EventDetailSidebar extends Component {
  state = {
    isEventPasswordCorret: false,
    password: '',
    attendeesCounter: 0,
    hideJoinButton: false
  }

  handleJoinButtonClick = () => {
    // const { currentEvent } = this.props

    // this.props.joinEvent(currentEvent.id)
    // this.props.fetchCurrentEventDetails(currentEvent.id)
    this.setState({
      attendeesCounter: this.state.attendeesCounter + 1,
      hideJoinButton: true
    })
  }

  handleEventPasswordSubmit = event => {
    event.preventDefault()

    if (
      this.state.password.toString() ===
      this.props.currentEventDetails.password.toString()
    ) {
      this.setState({ isEventPasswordCorret: true })
    }
  }

  componentWillUnmount() {
    this.setState({
      isEventPasswordCorret: false,
      password: '',
      hideJoinButton: false
    })
  }

  render() {
    const {
      classes,
      user,
      currentEvent,
      currentEventDetails,
      hideEventDetailSidebar,
      isMarkerClicked,
      showCreateEventForm,
      isAuthenticated
    } = this.props

    return (
      isMarkerClicked &&
      currentEventDetails && (
        <ClickAwayListener onClickAway={hideEventDetailSidebar}>
          <Slide direction="left" in={currentEventDetails !== null}>
            <Paper className={classes.sidebar}>
              <div className={classes.eventHeader}>
                {isAuthenticated &&
                  currentEvent.userId === user.id && (
                    <Button
                      variant="fab"
                      onClick={showCreateEventForm}
                      className={classes.editButton}
                    >
                      <EditIcon />
                    </Button>
                  )}
                <img
                  className={classes.eventImage}
                  src={`https://s3-ap-southeast-1.amazonaws.com/kumpulin-images/${
                    currentEventDetails.image
                  }`}
                  alt="Event"
                />
              </div>
              {currentEventDetails.privacy === 'PRIVATE' &&
              !this.state.isEventPasswordCorret ? (
                <div className={classes.contentCentered}>
                  <form onSubmit={this.handleEventPasswordSubmit}>
                    <TextField
                      label="Password"
                      type="password"
                      value={this.state.password}
                      onChange={e =>
                        this.setState({ password: e.target.value })
                      }
                    />
                  </form>
                </div>
              ) : (
                <Fragment>
                  <div className={classes.content}>
                    <div className={classes.contentHeader}>
                      <Typography
                        className={classes.sectionTitle}
                        variant="headline"
                      >
                        {currentEvent.title}
                      </Typography>
                      <Typography
                        className={classes.eventCreator}
                        variant="body2"
                      >
                        by <strong>{currentEventDetails.user.name}</strong>
                      </Typography>
                    </div>
                    <div className={classes.iconWithText}>
                      <ClockIcon />
                      <Typography
                        className={classes.iconText}
                        variant="subheading"
                      >
                        {format(currentEvent.start, 'HH:mm')} -{' '}
                        {format(currentEvent.end, 'HH:mm')}
                      </Typography>
                    </div>
                    <div className={classes.iconWithText}>
                      <CalendarIcon />
                      <Typography
                        className={classes.iconText}
                        variant="subheading"
                      >
                        {format(currentEvent.start, 'd MMM')} -{' '}
                        {format(currentEvent.end, 'd MMM')}
                      </Typography>
                    </div>
                    <div className={classes.iconWithText}>
                      <PlaceIcon />
                      <Typography
                        className={classes.iconText}
                        variant="subheading"
                      >
                        {currentEventDetails.full_address}
                      </Typography>
                    </div>
                    <div className={classes.description}>
                      <Typography
                        className={classes.sectionTitle}
                        variant="headline"
                        gutterBottom
                      >
                        Description
                      </Typography>
                      <Typography
                        className={classes.descriptionText}
                        variant="body1"
                        paragraph
                      >
                        {currentEventDetails.description}
                      </Typography>
                    </div>
                  </div>
                  {user && (
                    <div className={classes.buttonGroup}>
                      {(currentEventDetails.attendees.indexOf(user.id) === -1 ||
                        !this.state.hideJoinButton) && (
                        <Button
                          className={classNames([
                            classes.button,
                            classes.joinButton
                          ])}
                          variant="fab"
                          onClick={this.handleJoinButtonClick}
                        >
                          <AddIcon />
                        </Button>
                      )}
                      <Button
                        className={classNames([
                          classes.button,
                          classes.attendeesCounter,
                          this.state.hideJoinButton &&
                            classes.incrementedCounter
                        ])}
                        variant="extendedFab"
                        fullWidth
                        disabled
                      >
                        {this.state.attendeesCounter}
                      </Button>
                    </div>
                  )}
                </Fragment>
              )}
            </Paper>
          </Slide>
        </ClickAwayListener>
      )
    )
  }
}

EventDetailSidebar.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isMarkerClicked: state.app.isMarkerClicked,
  user: state.auth.user,
  currentEvent: state.event.currentEvent,
  currentEventDetails: state.event.currentEventDetails
})

const mapDispatchToProps = dispatch => ({
  joinEvent: id => dispatch(joinEvent(id)),
  fetchCurrentEventDetails: id => dispatch(fetchCurrentEventDetails(id)),
  hideEventDetailSidebar: () => dispatch(toggleEventDetailSidebar(false)),
  showCreateEventForm: () => {
    dispatch(toggleEventDetailSidebar(false))
    dispatch(toggleCreateEventForm(true))
    dispatch(toggleUpdateEvent(true))
  },
  dispatch
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(EventDetailSidebar)
