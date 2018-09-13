import {
  SET_CURRENT_FULLPAGE,
  TOGGLE_SIGNUP_FORM,
  TOGGLE_SIGNIN_FORM,
  TOGGLE_FORGOT_PASSWORD_FORM,
  TOGGLE_CHANGE_PASSWORD_FORM
} from '../constants/ActionTypes'

export function setCurrentFullPage (page) {
  return { type: SET_CURRENT_FULLPAGE, payload: { page } }
}

export function toggleSignUpForm (payload) {
  return { type: TOGGLE_SIGNUP_FORM, payload }
}

export function toggleSignInForm (payload) {
  return { type: TOGGLE_SIGNIN_FORM, payload }
}

export function toggleForgotPasswordForm (payload) {
  return { type: TOGGLE_FORGOT_PASSWORD_FORM, payload }
}

export function toggleChangePasswordForm (payload) {
  return { type: TOGGLE_CHANGE_PASSWORD_FORM, payload }
}
