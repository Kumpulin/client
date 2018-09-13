import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import emailValidator from "email-validator";
import blue from "@material-ui/core/colors/blue";

const styles = theme => ({
  paper: {
    position: "fixed",
    top: "50%",
    left: "75%",
    transform: "translate(-50%, -50%)",
    padding: theme.spacing.unit * 4,
    borderRadius: "10px",
    width: theme.spacing.unit * 45
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
    margin: theme.spacing.unit
  },
  lastTextField: {
    marginTop: theme.spacing.unit * 2
  },
  buttonGroup: {
    marginTop: theme.spacing.unit * 4,
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
});

class SignInForm extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    email: "",
    isEmailValid: true,
    password: "",
    showPassword: false
  };

  handleEmailChange = event => {
    if (!emailValidator.validate(event.target.value)) {
      this.setState({ isEmailValid: false });
    } else {
      this.setState({ isEmailValid: true, email: event.target.value });
    }
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleSubmit() {
    console.log(this.state);
  }

  render() {
    const { classes } = this.props;
    const { password, showPassword, isEmailValid } = this.state;

    return (
      <Paper className={classes.paper}>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <div className={classes.formTitleGroup}>
            <Typography className={classes.formTitle} variant="title">
              Masuk
            </Typography>
            <Typography variant="subheading">Lanjutkan ke Kumpulin</Typography>
          </div>

          <FormControl error={!isEmailValid}>
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

          <FormControl className={classes.lastTextField}>
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
          <div className={classes.buttonGroup}>
            <Button className={classes.signUpButton}>Create account</Button>
            <Button className={classes.signInButton} variant="flat">
              Sign In
            </Button>
          </div>
        </form>
      </Paper>
    );
  }
}

SignInForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignInForm);
