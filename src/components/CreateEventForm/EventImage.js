import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import compose from 'recompose/compose'
import { saveTempEventImage } from '../../actions/event'

const styles = theme => ({
  form: {
    paddingBottom: theme.spacing.unit * 3
  },
  inputFile: {
    display: 'none'
  },
  inputFileLabel: {
    display: 'block',
    height: '100%',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  inputFileContainer: {
    position: 'relative',
    height: theme.spacing.unit * 44,
    width: '100%'
  },
  inputTextContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white
  },
  image: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  inputText: {
    ...theme.typography.button,
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing.unit,
    boxShadow: theme.shadows[2]
  }
})

class EventImage extends Component {
  state = {
    image: null
  }

  handleImageChange = event => {
    this.setState({ image: event.target.files[0] })
    this.props.dispatch(saveTempEventImage({ image: event.target.files[0] }))
  }

  componentDidMount() {
    if (this.props.isUpdateEvent) {
      this.setState({ image: this.props.currentEventDetails.image })
    } else {
      this.setState({ image: null })
    }
  }

  componentWillUnmount() {
    if (this.props.isUpdateEvent) {
      this.props.dispatch(saveTempEventImage({ image: this.state.image }))
    }
  }

  render() {
    const { image } = this.state
    const { classes, isUpdateEvent, eventImage } = this.props

    return (
      <form className={classes.form}>
        <input
          accept="image/*"
          className={classes.inputFile}
          id="outlined-button-file"
          type="file"
          onChange={this.handleImageChange}
        />
        <label htmlFor="outlined-button-file">
          <Button
            variant="outlined"
            component="span"
            className={classes.button}
          >
            Upload
          </Button>
        </label>
      </form>
    )
  }
}

EventImage.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  isUpdateEvent: state.event.isUpdateEvent,
  currentEventDetails: state.event.currentEventDetails,
  eventImage: state.event.temp.eventImage
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(EventImage)
