import React from "react"
import { Link, NavLink } from "react-router-dom"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

const styles = theme => ({
  home: {
    padding: theme.spacing.unit * 8,
    backgroundColor: '#ff5d5d',
    height: '100%'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  navbar: {
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    fontFamily: 'Pacifico',
    color: '#ffffff',
    margin: 0,
    marginRight: theme.spacing.unit * 8,
    '& a': {
      color: 'inherit',
      textDecoration: 'none'
    }
  },
  signInButton: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    backgroundColor: 'white',
    color: '#ff5d5d',
    alignContent: 'strect',
    transitionProperty: 'all',
    boxShadow: 'none'
  },
  link: {
    ...theme.typography.subheading,
    color: 'white',
    textDecoration: 'none',
    marginRight: theme.spacing.unit * 8
  },
  linkActive: {
    fontWeight: 'bolder'
  }
})

function Home({ classes }) {
  return (
    <div className={classes.home}>
      <header className={classes.header}>
        <div className={classes.navbar}>
          <h1 className={classes.logo}><Link to="/">Kumpulin</Link></h1>
          <NavLink className={classes.link} activeClassName={classes.linkActive} to="/team">Team</NavLink>
        </div>
        <Button variant="extendedFab" className={classes.signInButton}>
          Sign In
        </Button>
      </header>
    </div>
  )
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
