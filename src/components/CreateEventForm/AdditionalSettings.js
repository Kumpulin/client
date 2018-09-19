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

  componentDidMount() {
    if (this.props.isUpdateEvent) {
      this.setState({ ...this.props.currentEventDetails })
    } else {
      this.setState({
        privacy: 'PUBLIC',
        type: '',
        topic: '',
        showPassword: false,
        password: ''
      })
    }
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
                <MenuItem value="Appearance or Signing">
                  Appearance or Signing
                </MenuItem>
                <MenuItem value="Attraction">Attraction</MenuItem>
                <MenuItem value="Camp, Trip, or Retreat">
                  Camp, Trip, or Retreat
                </MenuItem>
                <MenuItem value="Class, Training, or Workshop">
                  Class, Training, or Workshop
                </MenuItem>
                <MenuItem value="Concert or Performance">
                  Concert or Performance
                </MenuItem>
                <MenuItem value="Conference">Conference</MenuItem>
                <MenuItem value="Convention">Convention</MenuItem>
                <MenuItem value="Dinner or Gala">Dinner or Gala</MenuItem>
                <MenuItem value="Festival or Fair">Festival or Fair</MenuItem>
                <MenuItem value="Game or Competition">
                  Game or Competition
                </MenuItem>
                <MenuItem value="Meeting or Networking Event">
                  Meeting or Networking Event
                </MenuItem>
                <MenuItem value="Other">Other</MenuItem>
                <MenuItem value="Party or Social Gathering">
                  Party or Social Gathering
                </MenuItem>
                <MenuItem value="Race or Endurance Event">
                  Race or Endurance Event
                </MenuItem>
                <MenuItem value="Rally">Rally</MenuItem>
                <MenuItem value="Screening">Screening</MenuItem>
                <MenuItem value="Seminar or Talk">Seminar or Talk</MenuItem>
                <MenuItem value="Tour">Tour</MenuItem>
                <MenuItem value="Tournament">Tournament</MenuItem>
                <MenuItem value="Tradeshow, Consumer Show, or Expo">
                  Tradeshow, Consumer Show, or Expo
                </MenuItem>
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
                <MenuItem value="Auto, Boat & Air">Auto, Boat & Air</MenuItem>
                <MenuItem value="Business & Professional">
                  Business & Professional
                </MenuItem>
                <MenuItem value="Charity & Causes">Charity & Causes</MenuItem>
                <MenuItem value="Community & Culture">
                  Community & Culture
                </MenuItem>
                <MenuItem value="Family & Education">
                  Family & Education
                </MenuItem>
                <MenuItem value="Fashion & Beauty">Fashion & Beauty</MenuItem>
                <MenuItem value="Film, Media & Entertainment">
                  Film, Media & Entertainment
                </MenuItem>
                <MenuItem value="Food & Drink">Food & Drink</MenuItem>
                <MenuItem value="Government & Politics">
                  Government & Politics
                </MenuItem>
                <MenuItem value="Health & Wellness">Health & Wellness</MenuItem>
                <MenuItem value="Hobbies & Special Interest">
                  Hobbies & Special Interest
                </MenuItem>
                <MenuItem value="Home & Lifestyle">Home & Lifestyle</MenuItem>
                <MenuItem value="Music">Music</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
                <MenuItem value="Performing & Visual Arts">
                  Performing & Visual Arts
                </MenuItem>
                <MenuItem value="Religion & Spirituality">
                  Religion & Spirituality
                </MenuItem>
                <MenuItem value="School Activities">School Activities</MenuItem>
                <MenuItem value="Science & Technology">
                  Science & Technology
                </MenuItem>
                <MenuItem value="Seasonal & Holiday">
                  Seasonal & Holiday
                </MenuItem>
                <MenuItem value="Sports & Fitness">Sports & Fitness</MenuItem>
                <MenuItem value="Travel & Outdoor">Travel & Outdoor</MenuItem>
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
  isUpdateEvent: state.event.isUpdateEvent,
  additionalSettings: state.event.temp.additionalSettings,
  currentEventDetails: state.event.currentEventDetails
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
