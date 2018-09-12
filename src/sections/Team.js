import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  section: {
    padding: theme.spacing.unit * 16,
    display: "flex",
    flexWrap: "wrap",
    height: "100%"
  },
  member: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  avatar: {
    width: theme.spacing.unit * 28,
    height: theme.spacing.unit * 28
  },
  name: {
    marginTop: theme.spacing.unit * 2,
    color: "#ff5d5d"
  },
  title: {
    color: "#aaaaaa"
  }
});

const members = [
  {
    name: 'Gibran Khrisna Putra',
    title: 'Full Stack Developer',
    image: ''
  },
  {
    name: 'Raafi Nindyo Haswoto',
    title: 'Frontend Developer',
    image: ''
  },
  {
    name: 'Bagoes Ario Sukanto',
    title: 'Frontend Developer',
    image: ''
  },
  {
    name: 'Ruchma Kurniasari',
    title: 'Frontend Developer',
    image: ''
  }
]

function Team({ classes }) {
  return (
    <section className={classes.section}>
      <Grid container>
        {
          members.map(member => (
            <Grid className={classes.member} item sm={12} md={6}>
              <Avatar alt={member.name} src={member.image} className={classes.avatar} />
              <Typography className={classes.name} variant="title" gutterBottom>
                {member.name}
              </Typography>
              <Typography className={classes.title} variant="subheading">
                {member.title}
              </Typography>
            </Grid>
          ))
        }
      </Grid>
    </section>
  );
}

Team.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Team);
