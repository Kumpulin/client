import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Route } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'

import Team from '../sections/Team'
import Home from '../sections/Home'

const styles = {
  page: {
    position: 'fixed',
    top: '0',
    bottom: '0',
    height: '100%',
    width: '100%',
    transform: 'translateX(-50vw)',
  }
}

function Page ({ classes }) {
  return (
    <Grid container className={classes.page} direction="row-reverse">
      <Grid item xs={12} sm={6}>
        <Home />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Route path="/team" component={Team}/>
      </Grid>
    </Grid>
  )
}

Page.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Page)
