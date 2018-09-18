import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'
import { toggleCreateEventForm, setActiveStep } from '../../actions/app'
import { createEvent } from '../../actions/event'
import compose from 'recompose/compose'

import EventDetails from './EventDetails'
import EventImage from './EventImage'
import AdditionalSettings from './AdditionalSettings'
import Finish from './Finish'

const styles = theme => ({
  paper: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: theme.spacing.unit * 4,
    borderRadius: '10px',
    minWidth: theme.spacing.unit * 92,
    zIndex: 4
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  leftButton: {
    paddingLeft: theme.spacing.unit / 2,
    paddingRight: theme.spacing.unit / 2,
    color: '#ff5d5d',
    textTransform: 'none',
    marginLeft: theme.spacing.unit * 2 * -1
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  button: {
    backgroundColor: '#ff5d5d',
    color: 'white',
    boxShadow: 'none',
    transition: theme.transitions.create(['box-shadow', 'background-color']),
    textTransform: 'none',
    '&:hover': {
      boxShadow: theme.shadows[2],
      backgroundColor: '#DF554F'
    }
  },
  skipButton: {
    marginRight: theme.spacing.unit
  },
  closeButton: {
    alignSelf: 'end'
  }
})

const steps = ['Event Details', 'Event Images', 'Additional Settings']

function getStepContent(step) {
  switch (step) {
    case 0:
      return <EventDetails />
    case 1:
      return <EventImage />
    case 2:
      return <AdditionalSettings />
    case 3:
      return <Finish />
    default:
      return 'Unknown step'
  }
}

class ChangeEventForm extends Component {
  handleNext = () => {
    const { activeStep } = this.props

    this.props.dispatch(setActiveStep(activeStep + 1))
  }

  handleClose = () => {
    const data = new FormData()
    data.append('images', this.props.temp.eventImage.image)
    data.append('event_details', JSON.stringify(this.props.temp.eventDetails))
    data.append(
      'additional_settings',
      JSON.stringify(this.props.temp.eventAdditionalSettings)
    )

    this.props.dispatch(createEvent(data))
  }

  handleBack = () => {
    const { activeStep } = this.props

    this.props.dispatch(setActiveStep(activeStep - 1))
  }

  render() {
    const { classes, activeStep } = this.props

    return (
      <Paper className={classes.paper}>
        <Typography variant="title" align="center">
          Create An Event
        </Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          <div>
            {getStepContent(activeStep)}
            <div className={classes.buttonGroup}>
              {activeStep !== 3 ? (
                <Fragment>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.leftButton}
                  >
                    Back
                  </Button>
                  <Button
                    variant="flat"
                    onClick={this.handleNext}
                    className={classNames([classes.button, classes.nextButton])}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </Fragment>
              ) : (
                <Fragment>
                  <span />
                  <Button
                    variant="flat"
                    onClick={this.handleClose}
                    className={classNames([
                      classes.button,
                      classes.closeButton
                    ])}
                  >
                    Close
                  </Button>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </Paper>
    )
  }
}

ChangeEventForm.propTypes = {
  classes: PropTypes.object,
  hideCreateEventForm: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  activeStep: state.app.activeStep,
  temp: state.event.temp
})

const mapDispatchToProps = dispatch => ({
  hideCreateEventForm: () => {
    dispatch(toggleCreateEventForm(false))
    dispatch(setActiveStep(0))
  },
  dispatch
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(ChangeEventForm)
