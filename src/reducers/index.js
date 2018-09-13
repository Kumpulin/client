import { combineReducers } from 'redux'

import app from './app'
import auth from './auth'
import account from './account'
import event from './event'

const rootReducer = combineReducers({
  app,
  auth,
  account,
  event
})

export default rootReducer
