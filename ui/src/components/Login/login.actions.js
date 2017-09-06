export const USER_LOGIN_SUBMIT = 'USER_LOGIN_SUBMIT';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGOUT = 'USER_LOGOUT';

export const userLoginSubmit = function(email, password) {
  return {
    type: USER_LOGIN_SUBMIT,
    email,
    password
  }
};

export const userLoginSuccess = function(user) {
  return {
    type: USER_LOGIN_SUCCESS,
    user: user
  }
};

export const userLoginFailure = function(error) {
  return {
    type: USER_LOGIN_FAILURE,
    error: error
  }
};

export const userLogout = function() {
  return {
    type: USER_LOGOUT,
  }
};
