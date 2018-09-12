import { combineReducers } from 'redux'

import auth from './auth'
import account from './account'
import event from './event'

const rootReducer = combineReducers({
  auth,
  account,
  event
})

export default rootReducer
