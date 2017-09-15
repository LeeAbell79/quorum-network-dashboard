import { takeLatest, put, call } from 'redux-saga/effects';
import {
  ADD_NODE,
  addNodeSuccess,
  addNodeFailure
} from './addNode.actions';
import { env } from '../../env';
import { handleApiError } from '../../lib/apiErrorHandler';


const url = env.apiUrl + "/nodes";

function nodeApiCall(values) {
  return fetch(
    url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: values,
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
    yield call(nodeApiCall,JSON.stringify(action.values));
    yield put(addNodeSuccess());
  }
  catch(err) {
    yield put(addNodeFailure(err));
  }
}

export default function* watchNodeSubmit() {
  yield [
    takeLatest(ADD_NODE, submitNode),
  ]
}
