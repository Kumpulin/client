import axios from 'axios'
import {
  GET_JOINED_EVENTS,
  GET_ATTENDED_EVENTS,
} from '../constants/ActionTypes'

export const fetchJoinedEvents = ({ id }) => dispatch => {
  return dispatch => {
    axios.get(`/api/account/${id}/joined`)
      .then(({ data }) => dispatch(getAllJoinedEvents(data.events)))
  }
}

export const fetchAttendedEvents = ({ id }) => dispatch => {
  return dispatch => {
    axios.get(`/api/account/${id}/attended`)
      .then(({ data }) => dispatch(getAllAttendedEvents(data.events)))
  }
}

const getAllJoinedEvents = events => ({ type: GET_JOINED_EVENTS, payload: { joinedEvents: events } })
const getAllAttendedEvents = events => ({ type: GET_ATTENDED_EVENTS, payload: { attendedEvents: events } })
