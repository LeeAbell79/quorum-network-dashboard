import { takeLatest, put, call } from 'redux-saga/effects';
import {
  ADD_NODE,
  addNodeSuccess,
  addNodeFailure
} from './invite.actions';
import { env } from '../../env';
import { handleApiError } from '../../lib/apiErrorHandler';

const url = env.apiUrl + '/users';

function apiCall(url, body) {
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

function* submitNode(action) {
  try {
    yield call(
      apiCall,
      url,
      JSON.stringify(
        {
          nodeName: action.values.nodeName,
          email: action.values.email,
          host: action.values.host
        }
      )
    );
    yield put(addNodeSuccess());
  }
  catch(err) {
    yield put(addNodeFailure(err));
  }
}


export default function* watchInviteSubmit() {
  yield [
    takeLatest(ADD_NODE, submitNode),
  ]
}
