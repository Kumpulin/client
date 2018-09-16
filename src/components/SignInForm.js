import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import emailValidator from 'email-validator'
import Grid from '@material-ui/core/Grid'
import classNames from 'classnames'
import { toggleSignUpForm, toggleSignInForm } from '../actions/app'
import compose from 'recompose/compose'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

const styles = theme => ({
  paper: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    [theme.breakpoints.up('lg')]: {
      left: '75%'
    },
    transform: 'translate(-50%, -50%)',
    padding: theme.spacing.unit * 4,
    borderRadius: '10px',
    width: theme.spacing.unit * 48,
    transition: theme.transitions.create('transform')
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formTitleGroup: {
    marginBottom: theme.spacing.unit * 4
  },
  formTitle: {
    fontWeight: 400
  },
  buttonGroup: {
    marginTop: theme.spacing.unit * 4,
    display: 'flex',
    justifyContent: 'space-between'
  },
  signUpButton: {
    color: '#ff5d5d',
    textTransform: 'none',
    marginLeft: theme.spacing.unit * 2 * -1
  },
  signInButton: {
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
  hideForm: {
    transform: `translate(calc(100% + ${theme.spacing.unit * 24}px), -50%)`,
    [theme.breakpoints.up('lg')]: {
      transform: `translate(calc(75% + ${theme.spacing.unit * 24}px), -50%)`
    }
  }
})

class SignInForm extends Component {
  state = {
    email: '',
    isEmailValid: true,
    password: '',
    showPassword: false
  }

  handleEmailChange = event => {
    if (!emailValidator.validate(event.target.value)) {
      this.setState({ isEmailValid: false })
    } else {
      this.setState({ isEmailValid: true, email: event.target.value })
    }
  }

  handlePasswordChange = event => {
    this.setState({ password: event.target.value })
  }

  handleMouseDownPassword = event => {
    event.preventDefault()
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }))
  }

  handleSubmit() {
    console.log(this.state)
  }

  render() {
    const {
      classes,
      showSignUpForm,
      showSignInForm,
      hideSignInForm
    } = this.props
    const { password, showPassword, isEmailValid } = this.state

    return (
      <ClickAwayListener onClickAway={hideSignInForm}>
        <Paper
          className={classNames([
            classes.paper,
            !showSignInForm && classes.hideForm
          ])}
        >
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <Grid container spacing={24}>
              <Grid item xs={12} className={classes.formTitleGroup}>
                <Typography
                  align="center"
                  className={classes.formTitle}
                  variant="title"
                  gutterBottom
                >
                  Login
                </Typography>
                <Typography align="center" variant="subheading">
                  to continue to Kumpulin
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                error={!isEmailValid}
                label="Email"
                onChange={this.handleEmailChange}
                helperText={!isEmailValid ? 'Invalid email address.' : ' '}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl className={classes.textFieldWithMarginTop} fullWidth>
                <InputLabel>Password</InputLabel>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={this.handlePasswordChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText />
              </FormControl>
            </Grid>

            <Grid item xs={12} className={classes.buttonGroup}>
              <Button className={classes.signUpButton} onClick={showSignUpForm}>
                Create account
              </Button>
              <Button className={classes.signInButton} variant="flat">
                Sign In
              </Button>
            </Grid>
          </form>
        </Paper>
      </ClickAwayListener>
    )
  }
}

SignInForm.propTypes = {
  classes: PropTypes.object.isRequired,
  showSignUpForm: PropTypes.func.isRequired
}

const mapStateToProp = state => ({
  showSignInForm: state.app.isSignIn
})

const mapDispatchToProps = dispatch => ({
  hideSignInForm: () => {
    dispatch(toggleSignInForm(false))
  },
  showSignUpForm: () => {
    dispatch(toggleSignInForm(false))
    dispatch(toggleSignUpForm(true))
  }
})

export default compose(
  connect(
    mapStateToProp,
    mapDispatchToProps
  ),
  withStyles(styles)
)(SignInForm)
