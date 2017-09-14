export const ADD_NODE = "ADD_NODE";
export const ADD_NODE_SUCCESS = "ADD_NODE_SUCCESS";
export const ADD_NODE_FAILURE = "ADD_NODE_FAILURE";
export const ADD_NODE_NAVIGATION_SUCCESS = "ADD_NODE_NAVIGATION_SUCCESS";

export const addNode = function(values) {
  return {
    type: ADD_NODE,
    values: values
  }
}

export const addNodeSuccess = function() {
  return {
    type: ADD_NODE_SUCCESS
  }
}

export const addNodeFailure = function(error) {
  return {
    type: ADD_NODE_FAILURE,
    error: error
  }
}

export const addNodeNavigationSuccess = function() {
  return {
    type: ADD_NODE_NAVIGATION_SUCCESS
  }
}
