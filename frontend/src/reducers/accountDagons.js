import { ACCOUNT_DRAGONS_ACTION_TYPE } from "../action/types";
import fetchStates from "../reducers/fetchStates";

const ACCOUNTDRAGONS_DEFAULT = {
  dragons: []
};

const accountDragons = (state = ACCOUNTDRAGONS_DEFAULT, action) => {
  switch (action.type) {
    case ACCOUNT_DRAGONS_ACTION_TYPE.FETCH_STARTED:
      console.log(">>reducer accountDragon started", action);

      return {
        ...state,
        status: fetchStates.fetching
      };
    case ACCOUNT_DRAGONS_ACTION_TYPE.FETCH_SUCCEEDED:
      console.log(">>reducer accountDragon success", action);
      return {
        ...state,
        dragons: action.dragons,
        message: action.message,
        status: fetchStates.success
      };
    case ACCOUNT_DRAGONS_ACTION_TYPE.FETCH_FAILED:
      console.log(">>reducer accountDragon failed", action);

      return {
        ...state,
        message: action.message,
        status: fetchStates.error
      };

    default:
      return state;
  }
};

export default accountDragons;
