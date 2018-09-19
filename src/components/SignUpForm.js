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
import Fade from '@material-ui/core/Fade'
import CircularProgress from '@material-ui/core/CircularProgress'
import { signUp } from '../actions/auth'

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
    maxWidth: `calc(100% - ${theme.spacing.unit * 2}px)`,
    width: theme.spacing.unit * 64,
    borderRadius: '10px',
    transition: theme.transitions.create('transform')
  },
  formTitleGroup: {
    marginBottom: theme.spacing.unit * 4
  },
  formTitle: {
    fontWeight: 400
  },
  textFieldWithMarginTop: {
    marginTop: theme.spacing.unit * 3
  },
  buttonGroup: {
    marginTop: theme.spacing.unit * 3,
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
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255, .75)',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
    this.setState({
      isEmailValid: emailValidator.validate(event.target.value),
      email: event.target.value
    })
  }

  handlePasswordChange = event => {
    if (this.state.confirmPassword !== '') {
      this.setState({
        isPasswordSame: event.target.value === this.state.confirmPassword,
        password: event.target.value
      })
    } else {
      this.setState({ password: event.target.value })
    }
  }

  handleConfirmPasswordChange = event => {
    this.setState({
      isPasswordSame: event.target.value === this.state.password,
      confirmPassword: event.target.value
    })
  }

  handleMouseDownPassword = event => {
    event.preventDefault()
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }))
  }

  handleSubmit = event => {
    event.preventDefault()

    const { name, email, password } = this.state
    const { dispatch } = this.props

    dispatch(signUp({ name, email, password }))
  }

  handleClickAway = () => {
    const { hideSignUpForm } = this.props

    this.setState({
      name: '',
      email: '',
      isEmailValid: true,
      password: '',
      confirmPassword: '',
      showPassword: false,
      isPasswordSame: true
    })

    hideSignUpForm()
  }

  render() {
    const { classes, showSignUpForm, showSignInForm, isLoading } = this.props
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
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <Paper
          className={classNames([
            classes.paper,
            !showSignUpForm && classes.hideForm
          ])}
        >
          <Fade in={isLoading} unmountOnExit>
            <div className={classes.loaderContainer}>
              <CircularProgress />
            </div>
          </Fade>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <Grid container spacing={24}>
              <Grid item xs={12} className={classes.formTitleGroup}>
                <Typography
                  align="center"
                  className={classes.formTitle}
                  variant="title"
                  gutterBottom
                >
                  Create your Kumpulin Account
                </Typography>
                <Typography align="center" variant="subheading">
                  to continue to Kumpulin
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={this.handleNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  error={!isEmailValid}
                  className={classes.textFieldWithMarginTop}
                  label="Email"
                  value={email}
                  onChange={this.handleEmailChange}
                  helperText={!isEmailValid && 'Invalid email address.'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={this.handlePasswordChange}
                  className={classes.textFieldWithMarginTop}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  error={!isPasswordSame}
                  fullWidth
                  className={classes.textFieldWithMarginTop}
                >
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

            <Grid item xs={12} className={classes.buttonGroup}>
              <Button className={classes.signInButton} onClick={showSignInForm}>
                Sign in instead
              </Button>
              <Button
                type="submit"
                className={classes.signUpButton}
                variant="flat"
              >
                Sign Up
              </Button>
            </Grid>
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
  isLoading: state.auth.loading,
  showSignUpForm: state.app.isSignUp
})

const mapDispatchToProps = dispatch => ({
  hideSignUpForm: () => {
    dispatch(toggleSignUpForm(false))
  },
  showSignInForm: () => {
    dispatch(toggleSignUpForm(false))
    dispatch(toggleSignInForm(true))
  },
  dispatch
})

export default compose(
  connect(
    mapStateToProp,
    mapDispatchToProps
  ),
  withStyles(styles)
)(SignUpForm)
