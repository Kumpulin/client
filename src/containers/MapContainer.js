import { connect } from 'react-redux'

import Map from '../components/Map'

const mapStateToProps = state => ({
  events: state.event.events
})

export default connect(mapStateToProps)(Map)
