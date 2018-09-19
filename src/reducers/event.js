import {
  SAVE_TEMP_EVENT_DETAILS,
  SAVE_TEMP_EVENT_IMAGE,
  SAVE_TEMP_EVENT_ADDITIONAL_SETTINGS,
  GET_ALL_EVENTS,
  GET_CURRENT_EVENT_DETAILS,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILURE,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAILURE,
  JOIN_EVENT,
  CLEAR_TEMP_EVENT_DATA,
  SET_CURRENT_EVENT,
  TOGGLE_UPDATE_EVENT
} from '../constants/ActionTypes'

const initalState = {
  events: [],
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

export default function eventReducer(state = initalState, action) {
  switch (action.type) {
    case TOGGLE_UPDATE_EVENT:
      return {
        ...state,
        isUpdateEvent: action.payload
      }
    case SET_CURRENT_EVENT:
      return {
        ...state,
        currentEvent: state.events.find(event => event.id === action.payload)
      }
    case SAVE_TEMP_EVENT_DETAILS:
      return {
        ...state,
        temp: {
          ...state.temp,
          eventDetails: action.payload.eventDetails
        }
      }
    case SAVE_TEMP_EVENT_IMAGE:
      return {
        ...state,
        temp: {
          ...state.temp,
          eventImage: action.payload.eventImage,
          isImageChange: true
        }
      }
    case SAVE_TEMP_EVENT_ADDITIONAL_SETTINGS:
      return {
        ...state,
        temp: {
          ...state.temp,
          eventAdditionalSettings: action.payload.eventAdditionalSettings
        }
      }
    case CLEAR_TEMP_EVENT_DATA:
      return {
        ...state,
        temp: {
          isImageChange: false,
          eventDetails: null,
          eventImage: null,
          eventAdditionalSettings: null
        }
      }
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
          } else {
            return event
          }
        })
      }
    case UPDATE_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message
      }
    case GET_CURRENT_EVENT_DETAILS:
      return {
        ...state,
        currentEventDetails: action.payload
      }
    case JOIN_EVENT:
      return {
        ...state
      }
    default:
      return state
  }
}
