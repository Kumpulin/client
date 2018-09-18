import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  section: {
    padding: `${theme.spacing.unit * 16}px 0`
  }
})

function Finish({ classes }) {
  return (
    <section className={classes.section}>
      <Typography variant="title" align="center">
        All steps completed
      </Typography>
    </section>
  )
}

Finish.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Finish)
