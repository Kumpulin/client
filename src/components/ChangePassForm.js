import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormControl from "@material-ui/core/FormControl"
import Button from "@material-ui/core/Button"
import { Typography } from "@material-ui/core"
import blue from "@material-ui/core/colors/blue"

const styles = theme => ({
  paper: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: theme.spacing.unit * 4,
    borderRadius: "10px",
    width: theme.spacing.unit * 40
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  formTitleGroup: {
    textAlign: "center",
    marginBottom: theme.spacing.unit
  },
  formTitle: {
    fontWeight: 400,
    margin: theme.spacing.unit
  },
  lastTextField: {
    marginTop: theme.spacing.unit * 2
  },
  buttonGroup: {
    marginTop: theme.spacing.unit * 3,
    borderRadius: "25px",
    display: "flex",
    justifyContent: "space-between"
  },
  signUpButton: {
    color: "#ff5d5d",
    textTransform: "none",
    marginLeft: theme.spacing.unit * 2 * -1
  },
  signInButton: {
    backgroundColor: "#ff5d5d",
    color: "white",
    boxShadow: "none",
    transition: theme.transitions.create(["color", "background-color"]),
    textTransform: "none"
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

class ChangePasswordForm extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    newPassword: "",
    showNewPassword: false,
    confirmNewPassword: "",
    showConfirmNewPassword: false
  }

  handlePasswordChange = event => {
    this.setState({ newPassword: event.target.value })
  }
  
  handleConfirmPasswordChange = event => {
    this.setState({ confirmNewPassword: event.target.value })
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
    const { password, showPassword } = this.state

    return (
      <Paper className={classes.paper}>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <div className={classes.formTitleGroup}>
            <Typography className={classes.formTitle} variant="title">
              Change Password
            </Typography>
          </div>
          <FormControl className={classes.lastTextField}>
            <InputLabel
              FormLabelClasses={{
                root: classes.cssLabel,
                focused: classes.cssFocused
              }}
            >
              New Password
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
          <FormControl className={classes.lastTextField}>
            <InputLabel
              FormLabelClasses={{
                root: classes.cssLabel,
                focused: classes.cssFocused
              }}
            >
              Confirm New Password
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
          <div className={classes.buttonGroup}>
            <Button className={classes.signInButton} variant="flat">
              Change Password
            </Button>
            <Button className={classes.signUpButton} variant="flat">
              Cancel
            </Button>
          </div>
        </form>
      </Paper>
    )
  }
}

ChangePasswordForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ChangePasswordForm)
