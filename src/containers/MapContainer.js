import { connect } from 'react-redux'

import Map from '../components/Map'

const mapStateToProps = state => ({
  events: state.events
})

export default connect(mapStateToProps, mapDispatchToProps)(Map)
