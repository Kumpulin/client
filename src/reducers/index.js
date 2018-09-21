import { combineReducers } from 'redux'

import app from './app'
import auth from './auth'
import account from './account'
import event from './event'

const appReducer = combineReducers({
  app,
  auth,
  account,
  event
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = {
      app: {
        activeStep: 0,
        currentFullPage: null,
        isSignUp: false,
        isSignIn: false,
        isForgotPassword: false,
        isChangePassword: false,
        isCreateEvent: false,
        isMarkerClicked: false,
        isUserImageClicked: false
      },
      auth: {
        user: null,
        loading: false,
        isAuthenticated: false,
        error: null
      },
      account: {
        joinedEvents: [],
        attendedEvents: [],
        newPassword: null
      },
      event: {
        events: state.event.events,
        currentEvent: null,
        currentEventDetails: null,
        loading: false,
        error: null,
        isUpdateEvent: false,
        temp: {
          isImageChange: false,
          eventDetails: null,
          eventImage: null,
          eventAdditionalSettings: null
        }
      }
    }
  }

  return appReducer(state, action)
}

export default rootReducer
