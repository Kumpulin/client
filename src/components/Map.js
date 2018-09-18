import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer'
import { fetchAllEvents } from '../actions/event'

const defaultOptions = {
  disableDefaultUI: true
}

class Map extends Component {
  componentDidMount() {
    this.props.fetchAllEvents()
  }

  render() {
    const { events } = this.props

    const GoogleMapWithMarker = withGoogleMap(props => (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: -6.2297419, lng: 106.759478 }}
        defaultOptions={defaultOptions}
      >
        <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
          {events.map((event, i) => (
            <Marker
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
        loadingElement={<div style={{ height: `100%` }} />}
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
  events: state.event.events
})

const mapDispatchToProps = dispatch => ({
  fetchAllEvents: () => dispatch(fetchAllEvents())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)
