const GENERATION_ACTION_TYPE = {
  FETCH_STARTED: "FETCH_GENERATION_STARTED",
  FETCH_SUCCEEDED: "FETCH_GENERATION_SUCCEEDED",
  FETCH_FAILED: "FETCH_GENERATION_FAILED"
};

const DRAGON_ACTION_TYPE = {
  FETCH_STARTED: "FETCH_DRAGON_STARTED",
  FETCH_SUCCEEDED: "FETCH_DRAGON_SUCCEEDED",
  FETCH_FAILED: "FETCH_DRAGON_FAILED"
};

const ACCOUNT_ACTION_TYPE = {
  FETCH_STARTED: "FETCH_ACCOUNT_STARTED",
  FETCH_SUCCEEDED: "FETCH_ACCOUNT_SUCCEEDED",
  FETCH_FAILED: "FETCH_ACCOUNT_FAILED",
  LOGOUT_SUCCESS: "ACCOUNT_LOGOUT_SUCCEEDED",
  LOGIN_FETCH_SUCCEEDED: "ACCOUNT_LOGIN_SUCCEEDED",
  AUTHENTICATED_SUCCESS: "ACCOUNT_AUTHENTICATED_SUCCESS"
};

export { GENERATION_ACTION_TYPE, DRAGON_ACTION_TYPE, ACCOUNT_ACTION_TYPE };
