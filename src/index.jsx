import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import allReducers from '../reduxReducers'
import { Provider } from 'react-redux'
import {createStore} from 'redux'

const store = createStore(allReducers)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
