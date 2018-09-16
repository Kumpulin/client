import React, { Component } from 'react'
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
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { toggleCreateEventForm } from '../../actions/app'
import compose from 'recompose/compose'

import EventDetails from './EventDetails'
import EventImages from './EventImages'
import AdditionalSettings from './AdditionalSettings'

const styles = theme => ({
  paper: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: theme.spacing.unit * 4,
    borderRadius: '10px',
    minWidth: theme.spacing.unit * 92,
    zIndex: 1
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
  }
})

const steps = ['Event Details', 'Event Images', 'Additional Settings']

function getStepContent(step) {
  switch (step) {
    case 0:
      return <EventDetails />
    case 1:
      return <EventImages />
    case 2:
      return <AdditionalSettings />
    default:
      return 'Unknown step'
  }
}

class ChangeEventForm extends Component {
  state = {
    activeStep: 0,
    skipped: new Set()
  }

  isStepOptional = step => {
    return step === 1
  }

  handleNext = () => {
    const { activeStep } = this.state
    let { skipped } = this.state

    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values())

      skipped.delete(activeStep)
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped
    })
  }

  handleFinish = () => {
    this.props.hideCreateEventForm()
  }

  handleBack = () => {
    const { activeStep } = this.state

    this.setState({
      activeStep: activeStep - 1
    })
  }

  handleSkip = () => {
    const { activeStep } = this.state

    this.setState(state => {
      const skipped = new Set(state.skipped.values())

      skipped.add(activeStep)

      return {
        activeStep: state.activeStep + 1,
        skipped
      }
    })
  }

  handleReset = () => {
    this.setState({
      activeStep: 0
    })
  }

  isStepSkipped(step) {
    return this.state.skipped.has(step)
  }

  render() {
    const { classes, hideCreateEventForm } = this.props
    const { activeStep } = this.state

    return (
      <ClickAwayListener onClickAway={hideCreateEventForm}>
        <Paper className={classes.paper}>
          <Typography variant="title" align="center">
            Create An Event
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label, index) => {
              const props = {}
              const labelProps = {}

              if (this.isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                )
              }
              if (this.isStepSkipped(index)) {
                props.completed = false
              }
              return (
                <Step key={label} {...props}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              )
            })}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  All steps completed - you&quot;re finished
                </Typography>
                <Button
                  onClick={this.handleReset}
                  className={classes.leftButton}
                >
                  Reset
                </Button>
              </div>
            ) : (
              <div>
                {getStepContent(activeStep)}
                <div className={classes.buttonGroup}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.leftButton}
                  >
                    Back
                  </Button>

                  <div>
                    {this.isStepOptional(activeStep) && (
                      <Button
                        variant="flat"
                        onClick={this.handleSkip}
                        className={classNames([
                          classes.button,
                          classes.skipButton
                        ])}
                      >
                        Skip
                      </Button>
                    )}
                    <Button
                      variant="flat"
                      onClick={
                        activeStep === steps.length - 1
                          ? this.handleFinish
                          : this.handleNext
                      }
                      className={classNames([
                        classes.button,
                        classes.nextButton
                      ])}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Paper>
      </ClickAwayListener>
    )
  }
}

ChangeEventForm.propTypes = {
  classes: PropTypes.object,
  hideCreateEventForm: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  hideCreateEventForm: () => dispatch(toggleCreateEventForm(false))
})

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withStyles(styles)
)(ChangeEventForm)
