import {
  SET_CURRENT_FULLPAGE
} from '../constants/ActionTypes'

export function setCurrentFullPage (page) {
  return { type: SET_CURRENT_FULLPAGE, payload: { page } }
}
