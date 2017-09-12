import {
  GET_NODE_LIST_SUCCESS,
  GET_NODE_LIST_FAILURE,
} from './nodeList.actions';


const initialState = {
  error: null,
  nodes: []
};

const nodeListReducer = function (state = initialState, action) {
  switch(action.type) {
    case GET_NODE_LIST_SUCCESS:
      return {
        ...state,
        nodes: action.nodes
      };
    case GET_NODE_LIST_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default nodeListReducer;
