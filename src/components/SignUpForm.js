import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import IconButton from "@material-ui/core/IconButton"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import InputAdornment from "@material-ui/core/InputAdornment"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormControl from "@material-ui/core/FormControl"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import Button from "@material-ui/core/Button"
import { Typography } from "@material-ui/core"
import emailValidator from "email-validator"
import blue from "@material-ui/core/colors/blue"
import Grid from "@material-ui/core/Grid"

const styles = theme => ({
  paper: {
    position: "fixed",
    top: "50%",
    left: "75%",
    transform: "translate(-50%, -50%)",
    padding: theme.spacing.unit * 4,
    borderRadius: "10px",
    width: theme.spacing.unit * 72
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  formTitleGroup: {
    textAlign: "center",
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
    display: "flex",
    justifyContent: "space-between"
  },
  signInButton: {
    color: "#ff5d5d",
    textTransform: "none",
    marginLeft: theme.spacing.unit * 2 * -1
  },
  signUpButton: {
    backgroundColor: "#ff5d5d",
    transition: theme.transitions.create(["box-shadow"]),
    color: "white",
    textTransform: "none",
    '&:hover': {
      boxShadow: theme.shadows[2],
      backgroundColor: "#ff5d5d",
      color: "white",
    }
  },
  cssLabel: {
    "&$cssFocused": {
      color: blue[500]
    }
  },
  cssFocused: {},
  cssUnderline: {
    "&:after": {
      borderBottomColor: blue[500]
    }
  }
})

class SignInForm extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    email: '',
    isEmailValid: true,
    password: '',
    confirmPassword: '',
    showPassword: false,
    isPasswordSame: true
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
      this.setState({ isPasswordSame: true, confirmPassword: event.target.value })
    } else {
      this.setState({ isPasswordSame: false, confirmPassword: event.target.value })
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
    const { classes } = this.props
    const { password, confirmPassword, showPassword, isPasswordSame, isEmailValid } = this.state

    return (
      <Paper className={classes.paper}>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <div className={classes.formTitleGroup}>
            <Typography className={classes.formTitle} variant="title">
              Create your Kumpulin Account
            </Typography>
            <Typography variant="subheading">to continue to Kumpulin</Typography>
          </div>

          <FormControl>
            <InputLabel
              FormLabelClasses={{
                root: classes.cssLabel,
                focused: classes.cssFocused
              }}
            >
              Name
            </InputLabel>
            <Input
              classes={{
                underline: classes.cssUnderline
              }}
            />
            <FormHelperText />
          </FormControl>

          <FormControl
            error={!isEmailValid}
            className={classes.textFieldWithMarginTop}
          >
            <InputLabel
              FormLabelClasses={{
                root: classes.cssLabel,
                focused: classes.cssFocused
              }}
            >
              Email
            </InputLabel>
            <Input
              classes={{
                underline: classes.cssUnderline
              }}
              onChange={this.handleEmailChange}
            />
            <FormHelperText>
              {!isEmailValid && "Invalid email address."}
            </FormHelperText>
          </FormControl>

          <Grid className={classes.passwordGroup} container spacing={16}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel
                  FormLabelClasses={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused
                  }}
                >
                  Password
                </InputLabel>
                <Input
                  classes={{
                    underline: classes.cssUnderline
                  }}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={this.handlePasswordChange}
                />
                <FormHelperText />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl error={!isPasswordSame}>
                <InputLabel
                  FormLabelClasses={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused
                  }}
                >
                  Confirm password
                </InputLabel>
                <Input
                  classes={{
                    underline: classes.cssUnderline
                  }}
                  type={showPassword ? "text" : "password"}
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
                  {!isPasswordSame && 'Those passwords didn\'t match. Try again.'}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <div className={classes.buttonGroup}>
            <Button className={classes.signInButton}>Sign in instead</Button>
            <Button className={classes.signUpButton} variant="flat">
              Sign Up
            </Button>
          </div>
        </form>
      </Paper>
    )
  }
}

SignInForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SignInForm)
