import {
  USER_LOGIN_SUBMIT,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
} from './login.actions';
import { env } from '../../env';

const user = localStorage.getItem(env.localStorageKey);

const initialState = {
  user: user !== null ? JSON.parse(user) : {},
  error: {
    status: false,
    message: null,
  },
  authenticated: user !== null
};

const loginReducer = function (state = initialState, action) {
  switch(action.type) {
    case USER_LOGIN_SUBMIT:
      return initialState;
    case USER_LOGIN_SUCCESS:
      return {
        user: action.user,
        error: {
          status: false,
          message: null,
        },
        authenticated: true
      };
    case USER_LOGIN_FAILURE:
      return {
        user: {},
        error: {
          status: true,
          message: action.error.message
        },
        authenticated: false
      };
    case USER_LOGOUT:
      return {
        user: {},
        error: {
          status: false,
          message: null,
        },
        authenticated: false
      }
    default:
      return state;
  }
};

export default loginReducer;
