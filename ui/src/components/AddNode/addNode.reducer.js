import {
  ADD_NODE_NAVIGATION_SUCCESS,
  ADD_NODE_SUCCESS,
} from './addNode.actions';

const initialState = {
  redirectToDashboard: false
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case ADD_NODE_SUCCESS:
      return {
        redirectToDashboard: true
      }
    case ADD_NODE_NAVIGATION_SUCCESS: 
      return {
        redirectToDashboard: false
      }
    default:
      return state;
  }
};

export default reducer;
