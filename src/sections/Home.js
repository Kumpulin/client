import React from "react"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Avatar from "@material-ui/core/Avatar"

const styles = theme => ({
  home: {
    padding: theme.spacing.unit * 8,
    backgroundColor: '#ff5d5d',
    height: '100%'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
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
    backgroundColor: theme.palette.common.white,
    color: '#ff5d5d',
    boxShadow: 'none'
  },
  link: {
    ...theme.typography.subheading,
    color: theme.palette.common.white,
    textDecoration: 'none',
    marginRight: theme.spacing.unit * 8
  },
  linkActive: {
    fontWeight: 'bolder'
  },
  avatar: {
    height: theme.spacing.unit * 6,
    width: theme.spacing.unit * 6,
    backgroundColor: theme.palette.common.white
  }
})

function Home({ classes, user }) {
  return (
    <div className={classes.home}>
      <header className={classes.header}>
        <div className={classes.navbar}>
          <h1 className={classes.logo}><Link to="/">Kumpulin</Link></h1>
          <NavLink className={classes.link} activeClassName={classes.linkActive} to="/team">Team</NavLink>
        </div>
        {user !== null ? (
          <Avatar className={classes.avatar} src={user.image} alt={user.displayName !== null ? user.displayName : ''} />
        ) : (
          <Button variant="extendedFab" className={classes.signInButton}>
            Sign In
          </Button>
        )}
      </header>
    </div>
  )
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default withStyles(styles)(connect(mapStateToProps)(Home))
