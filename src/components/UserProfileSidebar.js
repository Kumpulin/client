import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import ButtonBase from '@material-ui/core/ButtonBase'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { toggleUserProfileSidebar } from '../actions/app'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Fade from '@material-ui/core/Fade'
import classNames from 'classnames'
import EditIcon from '@material-ui/icons/Edit'
import PersonIcon from '@material-ui/icons/Person'
import { updateProfile } from '../actions/auth'

const styles = theme => ({
  sidebar: {
    position: 'fixed',
    left: theme.spacing.unit * 4,
    top: theme.spacing.unit * 4,
    bottom: theme.spacing.unit * 4,
    zIndex: 3,
    width: theme.spacing.unit * 48,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: theme.transitions.create('transform')
  },
  sidebarHide: {
    transform: `translateX(-${theme.spacing.unit * 52}px)`
  },
  sidebarHeader: {
    padding: theme.spacing.unit * 4,
    paddingBottom: 0,
    display: 'flex',
    justifyContent: 'space-between'
  },
  userProfileHeader: {
    display: 'flex',
    alignItems: 'center'
  },
  userImage: {
    height: theme.spacing.unit * 7,
    width: theme.spacing.unit * 7,
    marginRight: theme.spacing.unit * 2
  },
  userName: {
    fontWeight: 'bolder'
  },
  userEmail: {
    fontWeight: 'normal',
    color: '#aaa'
  },
  sidebarContent: {
    flex: 1,
    padding: theme.spacing.unit * 4
  },
  changePasswordButton: {
    backgroundColor: '#ff5d5d',
    color: 'white',
    transition: theme.transitions.create('background-color'),
    '&:hover': {
      boxShadow: theme.shadows[2],
      backgroundColor: '#DF554F'
    }
  },
  title: {
    fontWeight: 'bold'
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
    height: theme.spacing.unit * 26,
    width: '100%',
    border: '1px solid #ddd',
    borderRadius: '50%',
    overflow: 'hidden'
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
  editButton: {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  profileImageLabel: {
    alignSelf: 'flex-start'
  },
  form: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  submitButton: {
    backgroundColor: '#ff5d5d',
    color: 'white',
    transition: theme.transitions.create(['box-shadow', 'background-color']),
    height: theme.spacing.unit * 7,
    '&:hover': {
      boxShadow: theme.shadows[2],
      backgroundColor: '#DF554F'
    }
  }
})

class UserProfileSidebar extends Component {
  state = {
    isEditing: false,
    name: '',
    email: '',
    image: ''
  }

  handleEditButtonClick = () => {
    this.setState({ isEditing: !this.state.isEditing })
  }

  handleFormSubmit = event => {
    event.preventDefault()

    this.props.dispatch(updateProfile(this.state))

    this.setState({
      isEditing: false,
      name: '',
      email: '',
      image: ''
    })
  }

  handleImageChange = event => {
    this.setState({ image: event.target.files[0] })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const {
      classes,
      user,
      isAuthenticated,
      isUserImageClicked,
      hideUserProfileSidebar
    } = this.props

    const { isEditing, name, email, image } = this.state

    return (
      isAuthenticated && (
        <ClickAwayListener onClickAway={hideUserProfileSidebar}>
          <Paper
            className={classNames([
              classes.sidebar,
              !isUserImageClicked && classes.sidebarHide
            ])}
          >
            <div className={classes.sidebarHeader}>
              <div className={classes.userProfileHeader}>
                {user.image || image !== '' ? (
                  <Avatar
                    src={
                      image !== ''
                        ? URL.createObjectURL(image)
                        : `${
                            process.env.REACT_APP_KUMPULIN_API_URL
                          }/images/uploads/${image}`
                    }
                    className={classes.userImage}
                  />
                ) : (
                  <Avatar className={classes.userImage}>
                    <PersonIcon />
                  </Avatar>
                )}
                <div>
                  <Typography className={classes.userName} variant="subheading">
                    {name !== '' ? name : user.name}
                  </Typography>
                  <Typography className={classes.userEmail} variant="body2">
                    {email !== '' ? email : user.email}
                  </Typography>
                </div>
              </div>

              {/* <Button
                variant="fab"
                className={classes.editButton}
                onClick={this.handleEditButtonClick}
              >
                <EditIcon />
              </Button> */}
            </div>
            <div className={classes.sidebarContent}>
              <form className={classes.form} onSubmit={this.handleFormSubmit}>
                <Grid container spacing={32} alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <Typography variant="subheading">Name</Typography>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      value={name !== '' ? name : user.name}
                      disabled={!isEditing}
                      onChange={this.handleChange('name')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="subheading">Email</Typography>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      value={email !== '' ? email : user.email}
                      disabled={!isEditing}
                      onChange={this.handleChange('email')}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    className={classes.profileImageLabel}
                  >
                    <Typography variant="subheading">Profile Image</Typography>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <input
                      accept="image/*"
                      className={classes.inputFile}
                      id="button-file"
                      type="file"
                      onChange={this.handleImageChange}
                    />
                    <ButtonBase
                      className={classes.inputFileContainer}
                      disabled={!isEditing}
                    >
                      <label
                        htmlFor="button-file"
                        className={classes.inputFileLabel}
                      >
                        <span
                          className={classes.image}
                          style={{
                            backgroundImage: `url(${
                              image !== ''
                                ? URL.createObjectURL(image)
                                : `${
                                    process.env.REACT_APP_KUMPULIN_API_URL
                                  }/images/uploads/${image}`
                            })`
                          }}
                        />
                      </label>
                    </ButtonBase>
                  </Grid>
                </Grid>
                <Fade in={isEditing}>
                  <Button
                    type="submit"
                    className={classes.submitButton}
                    variant="flat"
                    fullWidth
                  >
                    Update Profile
                  </Button>
                </Fade>
              </form>
            </div>
          </Paper>
        </ClickAwayListener>
      )
    )
  }
}

UserProfileSidebar.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  isUserImageClicked: state.app.isUserImageClicked,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
  hideUserProfileSidebar: () => dispatch(toggleUserProfileSidebar(false)),
  dispatch
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(UserProfileSidebar)
