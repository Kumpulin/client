import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import axios from 'axios'

import configureStore from './store'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import './index.css'

axios.defaults.baseURL = process.env.REACT_APP_KUMPULIN_API_URL

const store = configureStore()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
