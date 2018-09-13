import {
  SET_CURRENT_FULLPAGE,
  TOGGLE_SIGNUP_FORM,
  TOGGLE_SIGNIN_FORM,
  TOGGLE_FORGOT_PASSWORD_FORM,
  TOGGLE_CHANGE_PASSWORD_FORM
} from '../constants/ActionTypes'

const initialState = {
  currentFullPage: null,
  isSignUp: false,
  isSignIn: false,
  isForgotPassword: false,
  isChangePassword: false
}

export default function appReducer (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_FULLPAGE:
      return { ...state, currentFullPage: action.payload.page }
    case TOGGLE_SIGNUP_FORM:
      return { ...state, isSignUp: action.payload }
    case TOGGLE_SIGNIN_FORM:
      return { ...state, isSignIn: action.payload }
    case TOGGLE_FORGOT_PASSWORD_FORM:
      return { ...state, isForgotPassword: action.payload }
    case TOGGLE_CHANGE_PASSWORD_FORM:
      return { ...state, isChangePassword: action.payload }
    default:
      return state
  }
}
