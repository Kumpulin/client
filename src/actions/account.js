import axios from 'axios'
import Cookies from 'js-cookie'
import {
  GET_JOINED_EVENTS,
  GET_ATTENDED_EVENTS,
} from '../constants/ActionTypes'

export const fetchJoinedEvents = ({ id }) => dispatch => {
  axios.get(`/api/account/joined`, {}, authHeader)
    .then(({ data }) => dispatch(getAllJoinedEvents(data.events)))
}

export const fetchAttendedEvents = ({ id }) => dispatch => {
  axios.get(`/api/account/attended`, {}, authHeader)
    .then(({ data }) => dispatch(getAllAttendedEvents(data.events)))
}

const getAllJoinedEvents = events => ({ type: GET_JOINED_EVENTS, payload: { joinedEvents: events } })
const getAllAttendedEvents = events => ({ type: GET_ATTENDED_EVENTS, payload: { attendedEvents: events } })

const authHeader = {
  headers: {
    authorization: `Bearer ${Cookies.get('token')}`
  }
}
