import React, { Component } from 'react'
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
import classNames from 'classnames'

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
  buttonGroup: {
    marginTop: theme.spacing.unit * 4,
    display: 'flex',
    justifyContent: 'space-between'
  },
  cancelButton: {
    color: '#ff5d5d',
    textTransform: 'none',
    marginLeft: theme.spacing.unit * 2 * -1
  },
  changePasswordButton: {
    backgroundColor: '#ff5d5d',
    color: 'white',
    boxShadow: 'none',
    transition: theme.transitions.create(['color', 'background-color']),
    textTransform: 'none'
  },
  hideForm: {
    transform: `translate(calc(100% + ${theme.spacing.unit * 24}px), -50%)`,
    [theme.breakpoints.up('lg')]: {
      transform: `translate(calc(75% + ${theme.spacing.unit * 24}px), -50%)`
    }
  }
})

class ChangePasswordForm extends Component {
  state = {
    oldPassword: '',
    newPassword: '',
    showPassword: false
  }

  handleOldPasswordChange = event => {
    this.setState({ oldPassword: event.target.value })
  }

  handleNewPasswordChange = event => {
    this.setState({ newPassword: event.target.value })
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
    const { oldPassword, newPassword, showPassword } = this.state

    return (
      <Paper className={classNames([classes.paper])}>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <div className={classes.formTitleGroup}>
            <Typography className={classes.formTitle} variant="title">
              Change Password
            </Typography>
          </div>

          <TextField
            label="Enter your Password"
            type="password"
            value={oldPassword}
            onChange={this.handleOldPasswordChange}
            helperText=" "
          />

          <FormControl className={classes.textFieldWithMarginTop}>
            <InputLabel>Password</InputLabel>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={this.handleNewPasswordChange}
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
            <Button className={classes.cancelButton}>Cancel</Button>
            <Button className={classes.changePasswordButton} variant="flat">
              Change Password
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
