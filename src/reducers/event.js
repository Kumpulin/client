import {
  GET_ALL_EVENTS,
  GET_EVENT_DETAILS,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILURE,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAILURE,
  JOIN_EVENT
} from '../constants/ActionTypes'

const initalState = {
  events: null,
  currentEventDetails: null,
  loading: false,
  error: null
}

export default function eventReducer (state = initalState, action) {
  switch (action.type) {
    case GET_ALL_EVENTS:
      return {
        ...state,
        events: action.payload.events
      }
    case CREATE_EVENT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        events: [...state.events, action.payload.event]
      }
    case CREATE_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message
      }
    case UPDATE_EVENT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        events: state.events.filter(event => {
          if (event.id === action.payload.event.id) {
            return action.payload.event
          }
        })
      }
    case UPDATE_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message
      }
    case GET_EVENT_DETAILS:
      return {
        ...state,
        currentEventDetails: action.payload.eventDetails
      }
    case JOIN_EVENT:
      return {
        ...state,
        joinedEvents: [...state.joinedEvents, action.payload.event]
      }
    default:
      return state
  }
}
