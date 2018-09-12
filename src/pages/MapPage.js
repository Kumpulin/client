import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import MapContainer from '../containers/MapContainer'

const styles = {
  page: {
    position: 'fixed',
    top: '0',
    bottom: '0',
    transform: 'translateX(50vw)',
    height: '100%',
    width: '100%',
  }
}

function Page ({ classes }) {
  return (
    <div className={classes.page}>
      <MapContainer />
    </div>
  )
}

Page.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Page)
