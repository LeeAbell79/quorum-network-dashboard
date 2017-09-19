import { takeLatest, put, call } from 'redux-saga/effects';
import {
  CONFIRM_NODE,
  GET_NODE,
  confirmNodeSuccess,
  confirmNodeFailure,
  getNodeSuccess,
  getNodeFailure
} from './confirmNode.actions';
import { env } from '../../env';
import { handleApiError } from '../../lib/apiErrorHandler';

const getUrl = env.apiUrl + '/nodes/:id';
const putUrl = env.apiUrl + '/nodes';

// TODO: refactor this
function apiCall(method, url ,body) {
  return fetch(
    url,
    {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: method !== 'GET' ? body : undefined,
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
      'PUT',
      putUrl,
      JSON.stringify(
        action.node
      )
    );
    yield put(confirmNodeSuccess());
  }
  catch(err) {
    yield put(confirmNodeFailure(err));
  }
}

function* submitGetNode(action) {
  try {
    const response = yield call(
      apiCall,
      'GET',
      getUrl.replace(':id',action.id)
    );
    yield put(getNodeSuccess(response.node));
  }
  catch(err) {
    console.log(err);
    yield put(getNodeFailure(err));
  }
}


export default function* watchConfirmNode() {
  yield [
    takeLatest(CONFIRM_NODE, submitConfirmation),
    takeLatest(GET_NODE, submitGetNode)
  ]
}
