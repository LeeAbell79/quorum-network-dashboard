import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {HashRouter as Router} from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import { fork } from 'redux-saga/effects';
import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose
} from 'redux';

import App from './App/';

import loginReducer from './components/Login/login.reducer';

import watchLoginSubmit from './components/Login/login.saga';

const rootReducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  login: loginReducer
});

const rootSaga = function* startForeman() {
  yield [
    fork(watchLoginSubmit)
  ]
}

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// mount it on the Store
const store = createStore(
    rootReducer,
    process.env.NODE_ENV !== 'production'
      ? composeEnhancers(applyMiddleware(sagaMiddleware))
      : applyMiddleware(sagaMiddleware),
);

// then run the saga
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
