import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
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

  render() {
    const { image } = this.state
    const { classes, eventImage } = this.props

    return (
      <form className={classes.form}>
        <input
          accept="image/*"
          className={classes.inputFile}
          id="button-file"
          type="file"
          onChange={this.handleImageChange}
        />
        <ButtonBase className={classes.inputFileContainer}>
          <label htmlFor="button-file" className={classes.inputFileLabel}>
            <span
              className={classes.image}
              style={{
                backgroundImage: `url(${
                  eventImage
                    ? URL.createObjectURL(eventImage.image)
                    : image
                      ? URL.createObjectURL(image)
                      : ''
                })`
              }}
            />
            <span className={classes.inputTextContainer}>
              <Typography
                component="span"
                variant="subheading"
                color="inherit"
                className={classes.inputText}
              >
                Select image
              </Typography>
            </span>
          </label>
        </ButtonBase>
      </form>
    )
  }
}

EventImage.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
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
