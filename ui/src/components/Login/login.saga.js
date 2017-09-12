import { takeLatest, put, call } from 'redux-saga/effects';
import {
  USER_LOGIN_SUBMIT,
  USER_LOGOUT,
  userLoginSuccess,
  userLoginFailure
} from './login.actions';
import { env } from '../../env';
import { handleApiError } from '../../lib/apiErrorHandler';


const url = env.apiUrl + "/login";

function loginApiCall(email,password) {
  return fetch(
    url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
      credentials: 'include',
      mode: 'cors',
    }
  )
  .then(handleApiError)
  .then(function(response) {
    return response.json();
  })
  .catch(function(error) {
    throw error;
  });
}

function logoutApiCall(email) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

function* submitLogin(action) {
  try {
    const response = yield call(loginApiCall, action.email, action.password);
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
