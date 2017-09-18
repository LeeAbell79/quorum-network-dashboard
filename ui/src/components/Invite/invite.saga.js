import { takeLatest, put, call } from 'redux-saga/effects';
import {
  ADD_NODE,
  addNodeSuccess,
  addNodeFailure
} from './invite.actions';
import { env } from '../../env';
import { handleApiError } from '../../lib/apiErrorHandler';

const nodeUrl = env.apiUrl + '/nodes';
const userUrl = env.apiUrl + '/users';

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

function* submitNode(action) {
  try {
    const response = yield call(
      apiCall,
      userUrl,
      JSON.stringify(
        {
          email: action.values.email
        }
      )
    );
    // TODO: verify userid field in response
    yield call(
      apiCall,
      nodeUrl,
      JSON.stringify(
        {
          name: action.values.name,
          publicIp: action.values.publicIp,
          userId: response.user.id
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
