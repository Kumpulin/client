import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import classNames from "classnames";

import Map from "../components/Map";

const styles = theme => ({
  page: {
    position: "fixed",
    top: "0",
    bottom: "0",
    height: "100%",
    width: "100%",
    transition: theme.transitions.create(["transform"]),
    transform: "translateX(50vw)"
  },
  hidePage: {
    transform: "translateX(100vw)"
  },
  fullPage: {
    transform: "translateX(0)"
  },
  avatar: {
    position: "fixed",
    top: theme.spacing.unit * 4,
    left: theme.spacing.unit * 4,
    height: theme.spacing.unit * 6,
    width: theme.spacing.unit * 6,
    zIndex: 3
  }
});

function Page({ classes, user, currentFullPage }) {
  return (
    <div
      className={classNames([
        classes.page,
        currentFullPage === "map" && classes.fullPage,
        currentFullPage === "left" && classes.hidePage
      ])}
    >
      {user !== null && <Avatar src={user.image} className={classes.avatar} />}
      <Map />
    </div>
  );
}

Page.propTypes = {
  classes: PropTypes.object.isRequired,
  currentFullPage: PropTypes.string,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  currentFullPage: state.app.currentFullPage,
  user: state.auth.user
});

export default withStyles(styles)(connect(mapStateToProps)(Page));
