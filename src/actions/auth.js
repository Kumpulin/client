import axios from 'axios'
import Cookies from 'js-cookie'
import {
  GET_USER_DATA,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  LOGOUT
} from '../constants/ActionTypes'

import { toggleSignInForm, toggleSignUpForm } from './app'

export const fetchUserData = token => dispatch => {
  axios
    .get('/api/account/', {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    .then(({ data }) => dispatch(getUserData(data.user)))
}

export const signUp = data => dispatch => {
  dispatch(signUpStarted())

  axios
    .post('/api/auth/signup', data)
    .then(() => {
      dispatch(signUpSuccess())
      dispatch(toggleSignUpForm(false))
      dispatch(toggleSignInForm(true))
    })
    .catch(err => dispatch(signUpFailure(err.message)))
}

export const signIn = data => dispatch => {
  dispatch(signInStarted())

  axios
    .post('/api/auth/signin', data)
    .then(({ data }) => {
      dispatch(signInSuccess(data))
      dispatch(toggleSignInForm(false))
    })
    .catch(err => dispatch(signInFailure(err.message)))
}

export function logout() {
  Cookies.remove('token')
  return { type: LOGOUT }
}

const getUserData = user => ({ type: GET_USER_DATA, payload: { user } })

const signUpStarted = () => ({ type: SIGNUP_REQUEST })
const signUpSuccess = () => ({ type: SIGNUP_SUCCESS })
const signUpFailure = message => ({
  type: SIGNUP_FAILURE,
  payload: { message }
})

const signInStarted = () => ({ type: SIGNIN_REQUEST })

const signInSuccess = ({ user, token }) => {
  Cookies.set('token', token, { expires: 7 })
  return {
    type: SIGNIN_SUCCESS,
    payload: { user }
  }
}

const signInFailure = message => ({
  type: SIGNIN_FAILURE,
  payload: { message }
})
