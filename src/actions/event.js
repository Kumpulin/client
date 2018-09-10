import axios from 'axios'
import Cookies from 'js-cookie'
import {
  GET_ALL_EVENTS,
  GET_JOINED_EVENTS,
  GET_ATTENDED_EVENTS,
  GET_EVENT_DETAILS,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILURE,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAILURE,
  JOIN_EVENT
} from '../constants/ActionTypes'

export const fetchAllEvents = () => dispatch => {
  return dispatch => {
    axios.get('/api/events')
      .then(({ data }) => dispatch(getAllEvents(data.events)))
  }
}

export const fetchJoinedEvents = ({ id }) => dispatch => {
  return dispatch => {
    axios.get(`/api/users/${id}/joined`)
      .then(({ data }) => dispatch(getAllJoinedEvents(data.events)))
  }
}

export const fetchAttendedEvents = ({ id }) => dispatch => {
  return dispatch => {
    axios.get(`/api/users/${id}/attended`)
      .then(({ data }) => dispatch(getAllAttendedEvents(data.events)))
  }
}

export const fetchEventDetails = ({ id }) => dispatch => {
  return dispatch => {
    axios.get(`/api/events/${id}`)
      .then(({ data }) => dispatch(getEventDetails(data.eventDetails)))
  }
}

export const joinEvent = ({ id }) => dispatch => {
  return dispatch => {
    axios.post(`/api/events/${id}`)
      .then(({ data }) => dispatch(addJoinedEvents(data.event)))
  }
}

export const createEvent = ({ event, eventDetails }) => dispatch => {
  return dispatch => {
    dispatch(createEventStarted())

    axios.post('/api/events/', { event, eventDetails }, authHeader)
      .then(({ data }) => dispatch(createEventSuccess(data.event)))
      .catch(err => dispatch(createEventFailure(err.message)))
  }
}

export const updateEvent = ({ id, event, eventDetails }) => dispatch => {
  return dispatch => {
    dispatch(updateEventStarted())

    axios.post(`/api/events/${id}`, { event, eventDetails }, authHeader)
      .then(({ data }) => dispatch(updateEventSuccess(data.event)))
      .catch(err => dispatch(updateEventFailure(err.message)))
  }
}

const getAllEvents = events => ({ type: GET_ALL_EVENTS, payload: { events } })
const getAllJoinedEvents = events => ({ type: GET_JOINED_EVENTS, payload: { joinedEvents: events } })
const getAllAttendedEvents = events => ({ type: GET_ATTENDED_EVENTS, payload: { attendedEvents: events } })
const getEventDetails = eventDetails => ({ type: GET_EVENT_DETAILS, payload: { eventDetails } })
const addJoinedEvents = event => ({ type: JOIN_EVENT, payload: { event } })

const createEventStarted = () => ({ type: CREATE_EVENT_REQUEST })
const createEventSuccess = event => ({ type: CREATE_EVENT_SUCCESS, payload: { event } })
const createEventFailure = message => ({ type: CREATE_EVENT_FAILURE, payload: { message } })

const updateEventStarted = () => ({ type: UPDATE_EVENT_REQUEST })
const updateEventSuccess = event => ({ type: UPDATE_EVENT_SUCCESS, payload: { event } })
const updateEventFailure = message => ({ type: UPDATE_EVENT_FAILURE, payload: { message } })

const authHeader = {
  headers: {
    authorization: `Bearer ${Cookies.get('token')}`
  }
}
