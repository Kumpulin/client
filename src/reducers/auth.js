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

const initialState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  error: null
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        user: action.payload.user
      }
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message
      }
    case SIGNIN_REQUEST:
      return {
        ...state,
        loading: true
      }
    case SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        isAuthenticated: true
      }
    case SIGNIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message
      }
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false
      }
    default:
      return state
  }
}
