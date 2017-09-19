import {
  INVITE_SUCCESS,
  ADD_NODE_SUCCESS,
} from './invite.actions';

const initialState = {
  nodeCreated: false,
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case ADD_NODE_SUCCESS:
      return {
        ...state,
        nodeCreated: true
      }
    case INVITE_SUCCESS:
      return initialState
    default:
      return state;
  }
};

export default reducer;
