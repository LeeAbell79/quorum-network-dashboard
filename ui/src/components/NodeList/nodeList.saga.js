import { takeLatest, put, call } from 'redux-saga/effects';
import {
  GET_NODE_LIST,
  getNodeListSuccess,
  getNodeListFailure
} from './nodeList.actions';
import { env } from '../../env';
import { handleApiError } from '../../lib/apiErrorHandler';


const url = env.apiUrl + "/nodes";

function getNodeListApiCall() {
  return fetch(
    url,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
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

function* getNodeList(action) {
  try {
    const response = yield call(getNodeListApiCall);
    yield put(getNodeListSuccess(response.nodes));
  }
  catch(err)
  {
    yield put(getNodeListFailure(err));
  }
}

export default function* watchGetNodeList() {
  yield [
    takeLatest(GET_NODE_LIST, getNodeList),
  ]
}
