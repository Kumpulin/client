import {
  SET_CURRENT_FULLPAGE,
  SHOW_SIGNUP_FORM,
  HIDE_SIGNUP_FORM,
  SHOW_SIGNIN_FORM,
  HIDE_SIGNIN_FORM,
  SHOW_FORGOT_PASSWORD_FORM,
  HIDE_FORGOT_PASSWORD_FORM,
  SHOW_CHANGE_PASSWORD_FORM,
  HIDE_CHANGE_PASSWORD_FORM
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
    case SHOW_SIGNUP_FORM:
      return { ...state, isSignUp: true }
    case HIDE_SIGNUP_FORM:
      return { ...state, isSignUp: false }
    case SHOW_SIGNIN_FORM:
      return { ...state, isSignIn: true }
    case HIDE_SIGNIN_FORM:
      return { ...state, isSignIn: false }
    case SHOW_FORGOT_PASSWORD_FORM:
      return { ...state, isForgotPassword: true }
    case HIDE_FORGOT_PASSWORD_FORM:
      return { ...state, isForgotPassword: false }
    case SHOW_CHANGE_PASSWORD_FORM:
      return { ...state, isChangePassword: true }
    case HIDE_CHANGE_PASSWORD_FORM:
      return { ...state, isChangePassword: false }
    default:
      return state
  }
}
