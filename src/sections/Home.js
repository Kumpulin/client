import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import grey from '@material-ui/core/colors/grey'
import Hidden from '@material-ui/core/Hidden'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { setCurrentFullPage, toggleSignInForm } from '../actions/app'
import { logout } from '../actions/auth'
import compose from 'recompose/compose'

const styles = theme => ({
  home: {
    padding: theme.spacing.unit * 4,
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing.unit * 8
    },
    backgroundColor: '#ff5d5d',
    height: '100vh'
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
    marginRight: theme.spacing.unit * 4,
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing.unit * 8
    },
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
    boxShadow: 'none',
    transition: theme.transitions.create(['box-shadow']),
    '&:hover': {
      boxShadow: theme.shadows[2],
      backgroundColor: grey[50]
    }
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
    backgroundColor: theme.palette.common.white,
    cursor: 'pointer'
  }
})

class Home extends Component {
  state = {
    anchorEl: null
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleLogoutClick = () => {
    const { dispatch } = this.props

    dispatch(logout())

    this.setState({ anchorEl: null })
  }

  render() {
    const {
      classes,
      user,
      setLeftPageFull,
      showSignInForm,
      backToLandingPage
    } = this.props

    const { anchorEl } = this.state

    return (
      <div className={classes.home}>
        <header className={classes.header}>
          <div className={classes.navbar}>
            <h1 className={classes.logo} onClick={backToLandingPage}>
              <Link to="/">Kumpulin</Link>
            </h1>
            <Hidden only="xs">
              <NavLink
                onClick={setLeftPageFull}
                className={classes.link}
                activeClassName={classes.linkActive}
                to="/team"
              >
                Team
              </NavLink>
            </Hidden>
          </div>
          {user !== null ? (
            <Fragment>
              <Avatar
                className={classes.avatar}
                src={user.image}
                alt={user.displayName !== null ? user.displayName : ''}
                onClick={this.handleClick}
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
              />
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleLogoutClick}>Logout</MenuItem>
              </Menu>
            </Fragment>
          ) : (
            <Button
              variant="extendedFab"
              className={classes.signInButton}
              onClick={showSignInForm}
            >
              Sign In
            </Button>
          )}
        </header>
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  setLeftPageFull: PropTypes.func.isRequired,
  showSignInForm: PropTypes.func.isRequired,
  backToLandingPage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
  backToLandingPage: () => dispatch(setCurrentFullPage(null)),
  setLeftPageFull: () => dispatch(setCurrentFullPage('left')),
  showSignInForm: () => dispatch(toggleSignInForm(true)),
  dispatch
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(Home)
