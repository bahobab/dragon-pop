import {ACCOUNT_ACTION_TYPE} from '../action/types';
import fetchStates from '../reducers/fetchStates';

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
        case ACCOUNT_ACTION_TYPE.FETCH_SUCCEEDED:
            console.log('action', action);
            return {
                ...state,
                message: action.message,
                signedIn: true,
                status: fetchStates.success
            };
        case ACCOUNT_ACTION_TYPE.FETCH_FAILED:
            return {
                ...state,
                message: action.message,
                status: fetchStates.error,
                signedIn: false
            }
        case ACCOUNT_ACTION_TYPE.LOGOUT_SUCCESS:
            return {
                ...state,
                signedIn: false,
                message: action.message,
                status: fetchStates.success
            }
        default:
            return state;
    }
}

export default account;