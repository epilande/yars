import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router/es6';
import { syncHistoryWithStore } from 'react-router-redux';
import { install as offlineInstall } from 'offline-plugin/runtime'; // eslint-disable-line
// Important to have styles imported before routes
// so app.css can be load before component styles
import './styles/app.css';
import routes from './routes';
import configureStore from './store';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
);

if (process.env.NODE_ENV === 'production') {
  offlineInstall();
}
