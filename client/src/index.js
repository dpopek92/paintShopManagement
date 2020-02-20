// import "./errorReporting";
import React from 'react';
import * as Sentry from '@sentry/browser';
import ReactDOM from 'react-dom';
import './style/index.scss';
import 'bootstrap/scss/bootstrap.scss';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
// require("dotenv").config();

// Setup setnry
if (
 process.env.NODE_ENV === 'production' &&
 process.env.REACT_APP_SENTRY_RELEASE
) {
 Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DNS,
  release: process.env.REACT_APP_SENTRY_RELEASE,
 });
}

// Sentry.init({
//  dsn: "https://8a9e62f5ac1e498a9d3b37fb819f58ba@sentry.io/1854720",
//  release: "0.1.0"
// });

ReactDOM.render(
 <Provider store={store}>
  <App />
 </Provider>,
 document.getElementById('root'),
);
