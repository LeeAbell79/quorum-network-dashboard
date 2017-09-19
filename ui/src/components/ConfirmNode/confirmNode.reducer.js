import {
  CONFIRM_NODE,
  CONFIRM_NODE_SUCCESS,
  CONFIRM_NODE_FAILURE,
  GET_NODE,
  GET_NODE_SUCCESS,
  GET_NODE_FAILURE
} from './confirmNode.actions';

const initialState = {
  node: undefined,
  error: undefined,
  confirmationInProgress: false,
  confirmationCompleted: false,
  confirmationSuccessful: false,
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_NODE:
      return {
        ...state,
        confirmationInProgress: false,
        confirmationCompleted: false,
        confirmationSuccessful: false
      }
    case GET_NODE_SUCCESS:
      return {
        ...state,
        node: action.node,
        error: undefined
      }
    case GET_NODE_FAILURE:
      return {
        ...state,
        error: action.error
      }
    case CONFIRM_NODE:
      return {
        ...state,
        confirmationInProgress: true,
        confirmationCompleted: false,
        confirmationSuccessful: false
      }
    case CONFIRM_NODE_SUCCESS:
      return {
        ...state,
        confirmationInProgress: false,
        confirmationCompleted: true,
        confirmationSuccessful: true
      }
    case CONFIRM_NODE_FAILURE:
      return {
        ...state,
        confirmationInProgress: false,
        confirmationCompleted: true,
        confirmationSuccessful: false
      }
    default:
      return state;
  }
};

export default reducer;
