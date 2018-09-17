import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CalendarIcon from '@material-ui/icons/CalendarToday'
import format from 'date-fns/format'
import classNames from 'classnames'

const fillCard = {
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%'
}

const styles = theme => ({
  eventCard: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 10,
    color: 'white',
    overflow: 'hidden',
    minWidth: theme.spacing.unit * 24,
    height: theme.spacing.unit * 36,
    backgroundColor: '#ff5d5d',
    marginRight: theme.spacing.unit * 3,
    '&:first-child': {
      marginLeft: theme.spacing.unit * 3
    }
  },
  background: {
    ...fillCard,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  },
  backgroundImage: {
    minHeight: '100%'
  },
  overlay: {
    ...fillCard,
    backgroundColor: '#673AB750',
    zIndex: 3
  },
  content: {
    ...fillCard,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    zIndex: 4,
    padding: theme.spacing.unit * 2
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center'
  },
  startDate: {
    marginLeft: theme.spacing.unit
  },
  text: {
    color: 'white'
  },
  title: {
    fontWeight: 'bold'
  }
})

function EventCard(props) {
  const { classes, event } = props

  return (
    <div className={classes.eventCard}>
      <div className={classes.background}>
        <img className={classes.backgroundImage} src={event.image} />
        <div className={classes.overlay} />
      </div>

      <div className={classes.content}>
        <div className={classes.contentHeader}>
          <CalendarIcon />
          <Typography
            className={classNames([classes.text, classes.startDate])}
            variant="subheading"
          >
            {format(event.start, 'd MMM')}
          </Typography>
        </div>

        <div className="card-footer">
          <div>
            <Typography
              className={classNames([classes.text, classes.title])}
              variant="title"
            >
              {event.title}
            </Typography>
            <Typography className={classes.text} variant="subheading">
              {event.city_name}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

EventCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EventCard)
