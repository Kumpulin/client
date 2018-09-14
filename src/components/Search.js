import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'
import compose from 'recompose/compose'
import Slide from '@material-ui/core/Slide'

const styles = theme => ({
  search: {
    position: 'fixed',
    top: theme.spacing.unit * 4,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 4
  },
  searchInput: {
    backgroundColor: 'white',
    width: theme.spacing.unit * 64,
    padding: `${theme.spacing.unit * 1.5}px ${theme.spacing.unit * 3}px`,
    marginRight: theme.spacing.unit * 2,
    boxShadow: theme.shadows[2],
    borderRadius: '200px'
  },
  searchButton: {
    backgroundColor: '#ff5d5d',
    color: 'white',
    boxShadow: theme.shadows[2]
  }
})

class Search extends Component {
  state = {
    query: ''
  }

  handleEntering = node => {
    node.style.transform = 'translate(-50%, 0)'
  }

  render() {
    const { classes, currentFullPage } = this.props

    return (
      <Slide in={currentFullPage === 'map'} onEntering={this.handleEntering}>
        <div className={classes.search}>
          <Input className={classes.searchInput} label="bla" disableUnderline />
          <Button className={classes.searchButton} variant="fab">
            <SearchIcon />
          </Button>
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

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(Search)
