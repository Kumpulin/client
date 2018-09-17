import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import compose from 'recompose/compose'
import { saveTempEventAdditionalSettings } from '../../actions/event'

const styles = theme => ({
  form: {
    paddingBottom: theme.spacing.unit * 3
  }
})

class AdditionalSettings extends Component {
  state = {
    privacy: 'PUBLIC',
    type: '',
    topic: '',
    showPassword: false,
    password: ''
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
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

  componentWillUnmount() {
    const data = Object.assign({}, this.state)

    delete data.showPassword

    this.props.dispatch(saveTempEventAdditionalSettings(data))
  }

  render() {
    const { privacy, type, topic, showPassword, password } = this.state
    const { classes, additionalSettings } = this.props

    return (
      <form className={classes.form}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel>Event Privacy</FormLabel>
              <RadioGroup
                value={
                  additionalSettings ? additionalSettings.privacy : privacy
                }
                onChange={this.handleChange('privacy')}
              >
                <FormControlLabel
                  value="PUBLIC"
                  control={<Radio />}
                  label="Public"
                />
                <FormControlLabel
                  value="PRIVATE"
                  control={<Radio />}
                  label="Private"
                />
                <FormControl disabled={privacy !== 'PRIVATE'}>
                  <InputLabel>Password</InputLabel>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={
                      additionalSettings
                        ? additionalSettings.password
                        : password
                    }
                    onChange={this.handleChange('password')}
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
                </FormControl>
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Event Type</InputLabel>
              <Select
                value={additionalSettings ? additionalSettings.type : type}
                onChange={this.handleChange('type')}
                fullWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Event Topic</InputLabel>
              <Select
                value={additionalSettings ? additionalSettings.topic : topic}
                onChange={this.handleChange('topic')}
                fullWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    )
  }
}

AdditionalSettings.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  additionalSettings: state.event.temp.additionalSettings
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(AdditionalSettings)
