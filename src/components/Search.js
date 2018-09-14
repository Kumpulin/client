import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'

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
    color: 'white'
  }
})

class Search extends Component {
  state = {
    query: ''
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.search}>
        <Input className={classes.searchInput} label="bla" disableUnderline />
        <Button className={classes.searchButton} variant="fab">
          <SearchIcon />
        </Button>
      </div>
    )
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Search)
