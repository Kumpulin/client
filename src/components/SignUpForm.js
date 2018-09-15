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
    width: theme.spacing.unit * 72,
    transition: theme.transitions.create(['transform'])
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formTitleGroup: {
    textAlign: 'center',
    marginBottom: theme.spacing.unit * 4
  },
  formTitle: {
    fontWeight: 400,
    marginBottom: theme.spacing.unit
  },
  textFieldWithMarginTop: {
    marginTop: theme.spacing.unit * 2
  },
  passwordGroup: {
    marginTop: theme.spacing.unit * 2
  },
  buttonGroup: {
    marginTop: theme.spacing.unit * 4,
    display: 'flex',
    justifyContent: 'space-between'
  },
  signInButton: {
    color: '#ff5d5d',
    textTransform: 'none',
    marginLeft: theme.spacing.unit * 2 * -1
  },
  signUpButton: {
    backgroundColor: '#ff5d5d',
    transition: theme.transitions.create(['box-shadow', 'background-color']),
    color: 'white',
    textTransform: 'none',
    '&:hover': {
      boxShadow: theme.shadows[2],
      backgroundColor: '#DF554F'
    }
  },
  hideForm: {
    transform: `translate(calc(100% + ${theme.spacing.unit * 36}px), -50%)`,
    [theme.breakpoints.up('lg')]: {
      transform: `translate(calc(75% + ${theme.spacing.unit * 36}px), -50%)`
    }
  }
})

class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    isEmailValid: true,
    password: '',
    confirmPassword: '',
    showPassword: false,
    isPasswordSame: true
  }

  handleNameChange = event => {
    this.setState({ name: event.target.value })
  }

  handleEmailChange = event => {
    if (!emailValidator.validate(event.target.value)) {
      this.setState({ isEmailValid: false })
    } else {
      this.setState({ isEmailValid: true, email: event.target.value })
    }
  }

  handlePasswordChange = event => {
    if (this.state.confirmPassword !== '') {
      if (event.target.value === this.state.confirmPassword) {
        this.setState({ isPasswordSame: true, password: event.target.value })
      } else {
        this.setState({ isPasswordSame: false, password: event.target.value })
      }
    } else {
      this.setState({ password: event.target.value })
    }
  }

  handleConfirmPasswordChange = event => {
    if (event.target.value === this.state.password) {
      this.setState({
        isPasswordSame: true,
        confirmPassword: event.target.value
      })
    } else {
      this.setState({
        isPasswordSame: false,
        confirmPassword: event.target.value
      })
    }
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
      hideSignUpForm
    } = this.props
    const {
      name,
      email,
      password,
      confirmPassword,
      showPassword,
      isPasswordSame,
      isEmailValid
    } = this.state

    return (
      <ClickAwayListener onClickAway={hideSignUpForm}>
        <Paper
          className={classNames([
            classes.paper,
            !showSignUpForm && classes.hideForm
          ])}
        >
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <div className={classes.formTitleGroup}>
              <Typography className={classes.formTitle} variant="title">
                Create your Kumpulin Account
              </Typography>
              <Typography variant="subheading">
                to continue to Kumpulin
              </Typography>
            </div>

            <TextField
              label="Name"
              value={name}
              onChange={this.handleNameChange}
              helperText=" "
            />

            <TextField
              error={!isEmailValid}
              className={classes.textFieldWithMarginTop}
              label="Email"
              value={email}
              onChange={this.handleEmailChange}
              helperText={!isEmailValid && 'Invalid email address.'}
            />

            <Grid className={classes.passwordGroup} container spacing={16}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Password"
                  value={password}
                  onChange={this.handlePasswordChange}
                  helperText="  "
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl error={!isPasswordSame}>
                  <InputLabel>Confirm password</InputLabel>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={this.handleConfirmPasswordChange}
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
                  <FormHelperText>
                    {!isPasswordSame &&
                      "Those passwords didn't match. Try again."}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>

            <div className={classes.buttonGroup}>
              <Button className={classes.signInButton} onClick={showSignInForm}>
                Sign in instead
              </Button>
              <Button className={classes.signUpButton} variant="flat">
                Sign Up
              </Button>
            </div>
          </form>
        </Paper>
      </ClickAwayListener>
    )
  }
}

SignUpForm.propTypes = {
  classes: PropTypes.object.isRequired,
  showSignUpForm: PropTypes.bool
}

const mapStateToProp = state => ({
  showSignUpForm: state.app.isSignUp
})

const mapDispatchToProps = dispatch => ({
  hideSignUpForm: () => {
    dispatch(toggleSignUpForm(false))
  },
  showSignInForm: () => {
    dispatch(toggleSignUpForm(false))
    dispatch(toggleSignInForm(true))
  }
})

export default compose(
  connect(
    mapStateToProp,
    mapDispatchToProps
  ),
  withStyles(styles)
)(SignUpForm)
