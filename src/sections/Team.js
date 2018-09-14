import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import { Typography } from '@material-ui/core'
import grey from '@material-ui/core/colors/grey'

const styles = theme => ({
  section: {
    padding: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 16,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit * 12
    },
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing.unit * 16
    },
    display: 'flex',
    flexWrap: 'wrap',
    minHeight: '100vh'
  },
  member: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: theme.spacing.unit * 4,
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing.unit * 6
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: 0
    }
  },
  avatar: {
    width: theme.spacing.unit * 16,
    height: theme.spacing.unit * 16,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 28,
      height: theme.spacing.unit * 28
    }
  },
  name: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 2,
    color: '#ff5d5d'
  },
  title: {
    color: grey[400]
  }
})

const members = [
  {
    name: 'Gibran Khrisna Putra',
    title: 'Full Stack Developer',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCPVL4686tbTOUl2Hd00_-G225IekkCmV0fh2pnUuaLKKt1mqt'
  },
  {
    name: 'Raafi Nindyo Haswoto',
    title: 'Frontend Developer',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCPVL4686tbTOUl2Hd00_-G225IekkCmV0fh2pnUuaLKKt1mqt'
  },
  {
    name: 'Bagoes Ario Sukanto',
    title: 'Frontend Developer',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCPVL4686tbTOUl2Hd00_-G225IekkCmV0fh2pnUuaLKKt1mqt'
  },
  {
    name: 'Ruchma Kurniasari',
    title: 'Frontend Developer',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCPVL4686tbTOUl2Hd00_-G225IekkCmV0fh2pnUuaLKKt1mqt'
  }
]

function Team({ classes }) {
  return (
    <section className={classes.section}>
      <Grid container>
        {members.map((member, i) => (
          <Grid className={classes.member} item xs={12} sm={6} key={i}>
            <Avatar
              alt={member.name}
              src={member.image}
              className={classes.avatar}
            />
            <Typography className={classes.name} variant="title" gutterBottom>
              {member.name}
            </Typography>
            <Typography className={classes.title} variant="subheading">
              {member.title}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </section>
  )
}

Team.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Team)
