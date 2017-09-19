export const GET_NODE = 'GET_NODE';
export const GET_NODE_SUCCESS = 'GET_NODE_SUCCESS';
export const GET_NODE_FAILURE = 'GET_NODE_FAILURE';

export const CONFIRM_NODE = 'CONFIRM_NODE';
export const CONFIRM_NODE_SUCCESS = 'CONFIRM_NODE_SUCCESS';
export const CONFIRM_NODE_FAILURE = 'CONFIRM_NODE_FAILURE';

export const getNode = function(id) {
  return {
    type: GET_NODE,
    id:id
  };
}

export const getNodeSuccess = function(node) {
  return {
    type: GET_NODE_SUCCESS,
    node: node
  };
}

export const getNodeFailure = function(error) {
  return {
    type: GET_NODE_FAILURE,
    error: error
  };
}

export const confirmNode = function(node) {
  return {
    type: CONFIRM_NODE,
    node: node
  };
}

export const confirmNodeSuccess = function() {
  return {
    type: CONFIRM_NODE_SUCCESS,
  };
}

export const confirmNodeFailure = function() {
  return {
    type: CONFIRM_NODE_FAILURE,
  };
}
