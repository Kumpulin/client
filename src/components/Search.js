import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import compose from 'recompose/compose'
import Slide from '@material-ui/core/Slide'
import { fetchAllEvents } from '../actions/event'
import BackIcon from '@material-ui/icons/ArrowBack'
import { setCurrentFullPage } from '../actions/app'

const styles = theme => ({
  search: {
    position: 'fixed',
    top: theme.spacing.unit * 4,
    [theme.breakpoints.down('xs')]: {
      top: theme.spacing.unit * 2,
      padding: `0 ${theme.spacing.unit * 2}px`
    },
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 4,
    width: theme.spacing.unit * 64,
    maxWidth: '100%'
  },
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  searchInput: {
    backgroundColor: 'white',
    flex: 1,
    padding: `${theme.spacing.unit * 1.5}px ${theme.spacing.unit * 3}px`,
    [theme.breakpoints.down('md')]: {
      marginLeft: theme.spacing.unit * 2
    },
    boxShadow: theme.shadows[2],
    borderRadius: '200px'
  },
  button: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    },
    backgroundColor: '#ff5d5d',
    color: 'white',
    boxShadow: theme.shadows[2],
    transition: theme.transitions.create('background-color'),
    '&:hover': {
      backgroundColor: '#DF554F'
    }
  }
})

class Search extends Component {
  state = {
    query: ''
  }

  handleEntering = node => {
    node.style.transform = 'translate(-50%, 0)'
  }

  handleChange = event => {
    this.setState({ query: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()

    this.props.dispatch(fetchAllEvents(this.state.query))
  }

  render() {
    const { classes, currentFullPage, backToLandingPage } = this.props

    return (
      <Slide in={currentFullPage === 'map'} onEntering={this.handleEntering}>
        <div className={classes.search}>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <Button
              className={classes.button}
              onClick={backToLandingPage}
              variant="fab"
            >
              <BackIcon />
            </Button>
            <Input
              className={classes.searchInput}
              label="bla"
              disableUnderline
              onChange={this.handleChange}
            />
          </form>
        </div>
      </Slide>
    )
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  currentFullPage: state.app.currentFullPage
})

const mapDispatchToProps = dispatch => ({
  backToLandingPage: () => dispatch(setCurrentFullPage(null)),
  dispatch
})

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Search)
