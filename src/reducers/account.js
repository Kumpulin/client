import {
  GET_JOINED_EVENTS,
  GET_ATTENDED_EVENTS,
} from '../constants/ActionTypes'

const initalState = {
  joinedEvents: null,
  attendedEvents: null
}

export default function eventReducer (state = initalState, action) {
  switch (action.type) {
    case GET_JOINED_EVENTS:
      return {
        ...state,
        joinedEvents: action.payload.joinedEvents
      }
    case GET_ATTENDED_EVENTS:
      return {
        ...state,
        attendedEvents: action.payload.attendedEvents
      }
    default:
      return state
  }
}
