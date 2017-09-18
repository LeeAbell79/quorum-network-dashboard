import { takeLatest, put, call } from 'redux-saga/effects';
import {
  CONFIRM_ACCOUNT,
  confirmAccountSuccess,
  confirmAccountFailure
} from './confirm.actions';
import { env } from '../../env';
import { handleApiError } from '../../lib/apiErrorHandler';

const url = env.apiUrl + '/users/confirm';

function apiCall(url ,body) {
  return fetch(
    url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
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

function* submitConfirmation(action) {
  try {
    yield call(
      apiCall,
      url,
      JSON.stringify(
        {
          confirmationToken: action.token,
          password: action.password
        }
      )
    );
    yield put(confirmAccountSuccess());
  }
  catch(err) {
    yield put(confirmAccountFailure());
  }
}


export default function* watchConfirmSubmit() {
  yield [
    takeLatest(CONFIRM_ACCOUNT, submitConfirmation),
  ]
}
