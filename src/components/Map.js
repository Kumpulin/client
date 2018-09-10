import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer'

const defaultOptions = {
  disableDefaultUI: true
}

class Map extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.fetchAllEvents()
  }

  render () {
    const GoogleMapWithMarker = withGoogleMap(props => (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: -6.2297419  , lng: 106.759478 }}
        defaultOptions={ defaultOptions }
      >
        <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={60}
        >
          {this.props.events.map((event, i) => (
            <Marker
              key={i}
              position={{ lat: event.latitude  , lng: event.longitude }}
            />
          ))}
        </MarkerClusterer>
      </GoogleMap>
    ))

    return (
      <GoogleMapWithMarker
        loadingElement={ <div style={{ height: `100%` }} /> }
        containerElement={ <div style={{ height: `100%` }}/> }
        mapElement={ <div style={{ height: `100%` }}/> }
      />
    )
  }
}

Map.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object)
}

export default Map
