import { takeLatest, put, call } from 'redux-saga/effects';
import {
  USER_LOGIN_SUBMIT,
  USER_LOGOUT,
  userLoginSuccess,
  userLoginFailure
} from './login.actions';
import { env } from '../../env';

function loginApiCall(username,password) {
  return new Promise(function(resolve, reject) {
    resolve({
      user:'test'
    });
  });
}

function logoutApiCall(username,password) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

function* submitLogin(action) {
  try {
    const response = yield call(loginApiCall, action.username, action.password);
    localStorage.setItem(env.localStorageKey, JSON.stringify(response));
    yield put(userLoginSuccess(response));
  }
  catch(err)
  {
    yield put(userLoginFailure(err));
  }
}

function* submitLogout(action) {
  try {
    localStorage.removeItem(env.localStorageKey);
    yield call(logoutApiCall);
  }
  catch(err) {
  }
}

export default function* watchLoginSubmit() {
  yield [
    takeLatest(USER_LOGIN_SUBMIT, submitLogin),
    takeLatest(USER_LOGOUT, submitLogout)
  ]
}
