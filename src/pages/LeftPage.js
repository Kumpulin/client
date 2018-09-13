import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Route } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import classNames from 'classnames'
import compose from 'recompose/compose'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'

import Team from '../sections/Team'
import Home from '../sections/Home'

const styles = theme => ({
  page: {
    position: 'fixed',
    top: '0',
    bottom: '0',
    height: '100%',
    width: '100%',
    transition: theme.transitions.create(['transform']),
    [theme.breakpoints.down('lg')]: {
      overflowY: 'scroll'
    },
    [theme.breakpoints.up('lg')]: {
      transform: 'translateX(-50vw)'
    }
  },
  hidePage: {
    transform: 'translateX(-100vw)'
  },
  fullPage: {
    transform: 'translateX(0)'
  }
})

function Page({ classes, currentFullPage, width }) {
  return (
    <Grid
      container
      className={classNames([
        classes.page,
        currentFullPage === 'left' && classes.fullPage,
        currentFullPage === 'map' && classes.hidePage
      ])}
      direction="row-reverse"
    >
      <Grid item xs={12} lg={6}>
        <Home />
      </Grid>
      <Grid item xs={12} lg={6}>
        {isWidthUp('lg', width) ? (
          <Route path="/team" component={Team} />
        ) : (
          <Team />
        )}
      </Grid>
    </Grid>
  )
}

Page.propTypes = {
  classes: PropTypes.object.isRequired,
  currentFullPage: PropTypes.string
}

const mapStateToProps = state => ({
  currentFullPage: state.app.currentFullPage
})

export default compose(
  withStyles(styles),
  withWidth(),
  connect(mapStateToProps)
)(Page)
