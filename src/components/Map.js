import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer'
import { toggleEventDetailSidebar } from '../actions/app'
import { fetchCurrentEventDetails, setCurrentEvent } from '../actions/event'
import CircularProgress from '@material-ui/core/CircularProgress'

const defaultOptions = {
  disableDefaultUI: true
}

class Map extends Component {
  state = {
    event: {
      latitude: -6.2297419,
      longitude: 106.759478
    }
  }

  handleClick = event => {
    this.setState({ event })

    this.props.fetchCurrentEventDetails(event.id)
    this.props.setCurrentEvent(event.id)
    this.props.showEventDetailSidebar()
  }

  render() {
    const { event } = this.state
    const { events } = this.props

    const GoogleMapWithMarker = withGoogleMap(props => (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{
          lat: -6.2297419,
          lng: 106.759478
        }}
        center={{
          lat: JSON.parse(event.latitude),
          lng: JSON.parse(event.longitude)
        }}
        defaultOptions={defaultOptions}
      >
        <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
          {events.map((event, i) => (
            <Marker
              onClick={() => this.handleClick(event)}
              key={i}
              position={{
                lat: JSON.parse(event.latitude),
                lng: JSON.parse(event.longitude)
              }}
            />
          ))}
        </MarkerClusterer>
      </GoogleMap>
    ))

    return (
      <GoogleMapWithMarker
        loadingElement={<CircularProgress />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}

Map.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = state => ({
  events: state.event.events,
  eventDetails: state.event.eventDetails
})

const mapDispatchToProps = dispatch => ({
  fetchCurrentEventDetails: id => dispatch(fetchCurrentEventDetails(id)),
  setCurrentEvent: id => dispatch(setCurrentEvent(id)),
  showEventDetailSidebar: () => dispatch(toggleEventDetailSidebar(true)),
  dispatch
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)
