import {
  CONFIRM_ACCOUNT,
  CONFIRM_ACCOUNT_SUCCESS,
  CONFIRM_ACCOUNT_FAILURE
} from './confirmUser.actions';

const initialState = {
  confirmationInProgress: false,
  confirmationCompleted: false,
  confirmationSuccessful: false,
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case CONFIRM_ACCOUNT:
      return {
        confirmationInProgress: true,
        confirmationCompleted: false,
        confirmationSuccessful: false
      }
    case CONFIRM_ACCOUNT_SUCCESS:
      return {
        confirmationInProgress: false,
        confirmationCompleted: true,
        confirmationSuccessful: true
      }
    case CONFIRM_ACCOUNT_FAILURE:
      return {
        confirmationInProgress: false,
        confirmationCompleted: true,
        confirmationSuccessful: false
      }
    default:
      return state;
  }
};

export default reducer;
