import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
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
import compose from 'recompose/compose'
import { saveTempEventDetails } from '../../actions/event'

const styles = theme => ({
  form: {
    paddingBottom: theme.spacing.unit * 3
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
    full_address: '',
    city_name: '',
    latitude: 0,
    longitude: 0,
    start: null,
    end: null,
    description: ''
  }

  handleAddressChange = full_address => {
    this.setState({ full_address })
  }

  handleLocationSelect = async full_address => {
    const [location] = await geocodeByAddress(full_address)
    const { lat, lng } = await getLatLng(location)

    this.setState({
      full_address,
      city_name:
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

  async componentDidMount() {
    if (this.props.isUpdateEvent) {
      const [location] = await geocodeByAddress(
        this.props.currentEventDetails.full_address
      )
      const { lat, lng } = await getLatLng(location)

      this.setState({
        ...this.props.currentEvent,
        ...this.props.currentEventDetails,
        city_name:
          location.address_components[location.address_components.length - 4]
            .short_name,
        latitude: lat,
        longitude: lng
      })
    }
  }

  componentWillUnmount() {
    this.props.dispatch(saveTempEventDetails(this.state))
  }

  render() {
    const { title, full_address, start, end, description } = this.state
    const { classes, eventDetails } = this.props

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <form className={classes.form}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Title"
                fullWidth
                value={eventDetails ? eventDetails.title : title}
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
                value={eventDetails ? eventDetails.full_address : full_address}
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
                      value={
                        eventDetails ? eventDetails.full_address : full_address
                      }
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
                value={eventDetails ? eventDetails.start : start}
                onChange={this.handleDateChange('start')}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TimePicker
                label="Start Time"
                ampm={false}
                autoOk={true}
                value={eventDetails ? eventDetails.start : start}
                onChange={this.handleDateChange('start')}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <DatePicker
                label="End Date"
                leftArrowIcon={<LeftArrowIcon />}
                rightArrowIcon={<RightArrowIcon />}
                disablePast={true}
                value={eventDetails ? eventDetails.end : end}
                onChange={this.handleDateChange('end')}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TimePicker
                label="End Time"
                ampm={false}
                autoOk={true}
                value={eventDetails ? eventDetails.end : end}
                onChange={this.handleDateChange('end')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                multiline={true}
                rows={10}
                fullWidth
                value={eventDetails ? eventDetails.description : description}
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

const mapStateToProps = state => ({
  isUpdateEvent: state.event.isUpdateEvent,
  currentEvent: state.event.currentEvent,
  currentEventDetails: state.event.currentEventDetails,
  eventDetails: state.event.temp.eventDetails
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
)(EventDetails)
