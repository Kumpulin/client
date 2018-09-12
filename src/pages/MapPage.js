import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Avatar from "@material-ui/core/Avatar"

import Map from "../components/Map"

const styles = theme => ({
  page: {
    position: "fixed",
    top: "0",
    bottom: "0",
    transform: 'translateX(50vw)',
    height: "100%",
    width: "100%"
  },
  avatar: {
    position: "fixed",
    top: theme.spacing.unit * 4,
    left: theme.spacing.unit * 4,
    height: theme.spacing.unit * 6,
    width: theme.spacing.unit * 6,
    zIndex: 3
  }
})

function Page ({ classes, user }) {
  return (
    <div className={classes.page}>
      {user !== null && <Avatar src={user.image} className={classes.avatar} />}
      <Map />
    </div>
  )
}

Page.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default withStyles(styles)(connect(mapStateToProps)(Page))
