import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer'

const defaultOptions = {
  disableDefaultUI: true
}

function Map({ events }) {
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
            position={{ lat: event.latitude, lng: event.longitude }}
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

Map.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = state => ({
  events: state.event.events
})

export default connect(mapStateToProps)(Map)
