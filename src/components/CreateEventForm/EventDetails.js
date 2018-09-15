import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'
import TimePicker from 'material-ui-pickers/TimePicker'
import DatePicker from 'material-ui-pickers/DatePicker'
import LeftArrowIcon from '@material-ui/icons/KeyboardArrowLeft'
import RightArrowIcon from '@material-ui/icons/KeyboardArrowRight'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'

const styles = theme => ({
  form: {
    paddingBottom: theme.spacing.unit * 3
  },
  input: {
    marginTop: theme.spacing.unit * 2
  },
  inputLocationContainer: {
    position: 'relative'
  },
  locationSuggestions: {
    position: 'absolute',
    margin: theme.spacing.unit * 1.5,
    zIndex: 1,
    left: 0,
    right: 0
  }
})

class EventDetails extends Component {
  state = {
    title: '',
    address: '',
    cityName: '',
    latitude: 0,
    longitude: 0,
    startDateTime: null,
    endDateTime: null,
    description: ''
  }

  handleAddressChange = address => {
    this.setState({ address })
  }

  handleLocationSelect = async address => {
    const [location] = await geocodeByAddress(address)
    const { lat, lng } = await getLatLng(location)

    this.setState({
      address,
      cityName:
        location.address_components[location.address_components.length - 4]
          .short_name,
      latitude: lat,
      longitude: lng
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleDateChange = name => date => {
    this.setState({
      [name]: date
    })
  }

  render() {
    const {
      title,
      address,
      startDateTime,
      endDateTime,
      description
    } = this.state
    const { classes } = this.props

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <form className={classes.form}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Title"
                fullWidth
                value={title}
                onChange={this.handleChange('title')}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              className={classes.inputLocationContainer}
            >
              <PlacesAutocomplete
                value={address}
                onChange={this.handleAddressChange}
                onSelect={this.handleLocationSelect}
              >
                {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                  <Fragment>
                    <TextField
                      {...getInputProps({
                        label: 'Location',
                        fullWidth: true
                      })}
                      value={address}
                    />
                    <Paper className={classes.locationSuggestions} square>
                      {suggestions.map(suggestion => (
                        <MenuItem
                          {...getSuggestionItemProps(suggestion, {
                            component: 'div'
                          })}
                        >
                          {suggestion.description}
                        </MenuItem>
                      ))}
                    </Paper>
                  </Fragment>
                )}
              </PlacesAutocomplete>
            </Grid>
            <Grid item xs={6} sm={3}>
              <DatePicker
                label="Start Date"
                leftArrowIcon={<LeftArrowIcon />}
                rightArrowIcon={<RightArrowIcon />}
                disablePast={true}
                value={startDateTime}
                onChange={this.handleDateChange('startDateTime')}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TimePicker
                label="Start Time"
                ampm={false}
                autoOk={true}
                value={startDateTime}
                onChange={this.handleDateChange('startDateTime')}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <DatePicker
                label="End Date"
                leftArrowIcon={<LeftArrowIcon />}
                rightArrowIcon={<RightArrowIcon />}
                disablePast={true}
                value={endDateTime}
                onChange={this.handleDateChange('endDateTime')}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TimePicker
                label="End Time"
                ampm={false}
                autoOk={true}
                value={endDateTime}
                onChange={this.handleDateChange('endDateTime')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                multiline={true}
                rows={10}
                fullWidth
                value={description}
                onChange={this.handleChange('description')}
              />
            </Grid>
          </Grid>
        </form>
      </MuiPickersUtilsProvider>
    )
  }
}

EventDetails.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EventDetails)
