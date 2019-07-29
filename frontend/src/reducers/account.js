import { ACCOUNT_ACTION_TYPE } from "../action/types";
import fetchStates from "../reducers/fetchStates";

const DEFAULT_ACCOUT = {
  signedIn: false
};

const account = (state = DEFAULT_ACCOUT, action) => {
  switch (action.type) {
    case ACCOUNT_ACTION_TYPE.FETCH_STARTED:
      return {
        ...state,
        status: fetchStates.fetching
      };
    case ACCOUNT_ACTION_TYPE.AUTHENTICATED_FETCH_SUCCEEDED:
      console.log("action authenticated success", action);
      return {
        ...state,
        signedIn: action.authenticated,
        message: action.message,
        status: fetchStates.success
      };
    case ACCOUNT_ACTION_TYPE.LOGIN_FETCH_SUCCEEDED:
    case ACCOUNT_ACTION_TYPE.SIGNUP_FETCH_SUCCEEDED:
      return {
        ...state,
        message: action.message,
        signedIn: true,
        status: fetchStates.success
      };
    case ACCOUNT_ACTION_TYPE.FETCH_FAILED:
      // case ACCOUNT_ACTION_TYPE.LOGIN_FETCH_FAILED:
      // case ACCOUNT_ACTION_TYPE.SIGNUP_FETCH_FAILED:
      console.log(">>Reducer: fetch failed", action);
      return {
        ...state,
        message: action.message,
        status: fetchStates.error,
        signedIn: false
      };
    case ACCOUNT_ACTION_TYPE.LOGOUT_FETCH_SUCCEEDED:
      console.log(">>reducer: signout message", action.message);
      return {
        ...state,
        signedIn: false,
        message: action.message,
        status: fetchStates.success
      };
    default:
      return state;
  }
};

export default account;
