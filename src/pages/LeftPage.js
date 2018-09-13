import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Route } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames";

import Team from "../sections/Team";
import Home from "../sections/Home";

const styles = theme => ({
  page: {
    position: "fixed",
    top: "0",
    bottom: "0",
    height: "100%",
    width: "100%",
    transition: theme.transitions.create(["transform"]),
    transform: "translateX(-50vw)"
  },
  hidePage: {
    transform: "translateX(-100vw)"
  },
  fullPage: {
    transform: "translateX(0)"
  }
});

function Page({ classes, currentFullPage }) {
  return (
    <Grid
      container
      className={classNames([
        classes.page,
        currentFullPage === "left" && classes.fullPage,
        currentFullPage === "map" && classes.hidePage
      ])}
      direction="row-reverse"
    >
      <Grid item xs={12} sm={6}>
        <Home />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Route path="/team" component={Team} />
      </Grid>
    </Grid>
  );
}

Page.propTypes = {
  classes: PropTypes.object.isRequired,
  currentFullPage: PropTypes.string
};

const mapStateToProps = state => ({
  currentFullPage: state.app.currentFullPage
});

export default withStyles(styles)(connect(mapStateToProps)(Page));
