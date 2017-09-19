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
import nodeListReducer from './components/NodeList/nodeList.reducer.js';
import inviteReducer from './components/Invite/invite.reducer.js';
import confirmUserReducer from './components/ConfirmUser/confirmUser.reducer.js';
import confirmNodeReducer from './components/ConfirmNode/confirmNode.reducer.js';

import watchLoginSubmit from './components/Login/login.saga';
import watchGetNodeList from './components/NodeList/nodeList.saga';
import watchInviteSubmit from './components/Invite/invite.saga';
import watchConfirmUserSubmit from './components/ConfirmUser/confirmUser.saga';
import watchConfirmNode from './components/ConfirmNode/confirmNode.saga';

const rootReducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  login: loginReducer,
  nodeList: nodeListReducer,
  invite: inviteReducer,
  confirmUser: confirmUserReducer,
  confirmNode: confirmNodeReducer,
});

const rootSaga = function* startForeman() {
  yield [
    fork(watchLoginSubmit),
    fork(watchGetNodeList),
    fork(watchInviteSubmit),
    fork(watchConfirmUserSubmit),
    fork(watchConfirmNode),
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
