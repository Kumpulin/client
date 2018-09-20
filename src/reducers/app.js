import {
  SET_ACTIVE_STEP,
  SET_CURRENT_FULLPAGE,
  TOGGLE_SIGNUP_FORM,
  TOGGLE_SIGNIN_FORM,
  TOGGLE_FORGOT_PASSWORD_FORM,
  TOGGLE_CHANGE_PASSWORD_FORM,
  TOGGLE_CREATE_EVENT_FORM,
  TOGGLE_EVENT_DETAIL_SIDEBAR,
  TOGGLE_USER_PROFILE_SIDEBAR
} from '../constants/ActionTypes'

const initialState = {
  activeStep: 0,
  currentFullPage: null,
  isSignUp: false,
  isSignIn: false,
  isForgotPassword: false,
  isChangePassword: false,
  isCreateEvent: false,
  isMarkerClicked: false,
  isUserImageClicked: false
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_STEP:
      return {
        ...state,
        activeStep: action.payload
      }
    case SET_CURRENT_FULLPAGE:
      return {
        ...state,
        currentFullPage: action.payload.page
      }
    case TOGGLE_SIGNUP_FORM:
      return { ...state, isSignUp: action.payload }
    case TOGGLE_SIGNIN_FORM:
      return { ...state, isSignIn: action.payload }
    case TOGGLE_FORGOT_PASSWORD_FORM:
      return { ...state, isForgotPassword: action.payload }
    case TOGGLE_CHANGE_PASSWORD_FORM:
      return { ...state, isChangePassword: action.payload }
    case TOGGLE_CREATE_EVENT_FORM:
      return { ...state, isCreateEvent: action.payload }
    case TOGGLE_EVENT_DETAIL_SIDEBAR:
      return { ...state, isMarkerClicked: action.payload }
    case TOGGLE_USER_PROFILE_SIDEBAR:
      return { ...state, isUserImageClicked: action.payload }
    default:
      return state
  }
}
