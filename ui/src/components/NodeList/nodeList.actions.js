export const GET_NODE_LIST = 'GET_NODE_LIST';
export const GET_NODE_LIST_SUCCESS = 'GET_NODE_LIST_SUCCESS';
export const GET_NODE_LIST_FAILURE = 'GET_NODE_LIST_FAILURE';

export const getNodeList = function() {
  return {
    type: GET_NODE_LIST,
  }
};

export const getNodeListSuccess = function(nodes) {
  return {
    type: GET_NODE_LIST_SUCCESS,
    nodes: nodes
  }
};

export const getNodeListFailure = function(error) {
  return {
    type: GET_NODE_LIST_FAILURE,
    error: error
  }
};
