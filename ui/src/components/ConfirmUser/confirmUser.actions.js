export const CONFIRM_ACCOUNT = 'CONFIRM_ACCOUNT';
export const CONFIRM_ACCOUNT_SUCCESS = 'CONFIRM_ACCOUNT_SUCCESS';
export const CONFIRM_ACCOUNT_FAILURE = 'CONFIRM_ACCOUNT_FAILURE';

export const confirmAccount = function(token, password) {
  return {
    type: CONFIRM_ACCOUNT,
    token: token,
    password: password
  }
}

export const confirmAccountSuccess = function() {
  return {
    type: CONFIRM_ACCOUNT_SUCCESS,
  }
}

export const confirmAccountFailure = function() {
  return {
    type: CONFIRM_ACCOUNT_FAILURE,
  }
}
