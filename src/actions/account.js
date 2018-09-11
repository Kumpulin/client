import axios from 'axios'
import Cookies from 'js-cookie'
import {
  GET_CREATED_EVENTS,
  GET_JOINED_EVENTS,
  GET_ATTENDED_EVENTS,
} from '../constants/ActionTypes'

export const fetchCreatedEvents = ({ id }) => dispatch => {
  axios.get(`/api/account/created_events`, {}, authHeader)
    .then(({ data }) => dispatch(getAllCreatedEvents(data.events)))
}

export const fetchJoinedEvents = ({ id }) => dispatch => {
  axios.get(`/api/account/joined_events`, {}, authHeader)
    .then(({ data }) => dispatch(getAllJoinedEvents(data.events)))
}

export const fetchAttendedEvents = ({ id }) => dispatch => {
  axios.get(`/api/account/attended_events`, {}, authHeader)
    .then(({ data }) => dispatch(getAllAttendedEvents(data.events)))
}

const getAllCreatedEvents = events => ({ type: GET_CREATED_EVENTS, payload: { createdEvents: events } })
const getAllJoinedEvents = events => ({ type: GET_JOINED_EVENTS, payload: { joinedEvents: events } })
const getAllAttendedEvents = events => ({ type: GET_ATTENDED_EVENTS, payload: { attendedEvents: events } })

const authHeader = {
  headers: {
    authorization: `Bearer ${Cookies.get('token')}`
  }
}
