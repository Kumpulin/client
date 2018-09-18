import {
  SET_ACTIVE_STEP,
  SET_CURRENT_FULLPAGE,
  TOGGLE_SIGNUP_FORM,
  TOGGLE_SIGNIN_FORM,
  TOGGLE_FORGOT_PASSWORD_FORM,
  TOGGLE_CHANGE_PASSWORD_FORM,
  TOGGLE_CREATE_EVENT_FORM,
  TOGGLE_EVENT_DETAIL_SIDEBAR
} from '../constants/ActionTypes'

export function setActiveStep(index) {
  return { type: SET_ACTIVE_STEP, payload: index }
}

export function setCurrentFullPage(page) {
  return { type: SET_CURRENT_FULLPAGE, payload: { page } }
}

export function toggleSignUpForm(payload) {
  return { type: TOGGLE_SIGNUP_FORM, payload }
}

export function toggleSignInForm(payload) {
  return { type: TOGGLE_SIGNIN_FORM, payload }
}

export function toggleForgotPasswordForm(payload) {
  return { type: TOGGLE_FORGOT_PASSWORD_FORM, payload }
}

export function toggleChangePasswordForm(payload) {
  return { type: TOGGLE_CHANGE_PASSWORD_FORM, payload }
}

export function toggleCreateEventForm(payload) {
  return { type: TOGGLE_CREATE_EVENT_FORM, payload }
}

export function toggleEventDetailSidebar(payload) {
  return { type: TOGGLE_EVENT_DETAIL_SIDEBAR, payload }
}
