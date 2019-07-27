import {ACCOUNT_ACTION_TYPE} from './types';
import {BACKEND} from '../config';

const fetchFromAccount = ({endpoint, options, SUCCESS_TYPE}) => dispatch => {
    dispatch({type: ACCOUNT_ACTION_TYPE.FETCH_STARTED})

    return fetch(`${BACKEND.ADDRESS}/account/${endpoint}`, options)
        .then(response => response.json())
        .then(json => {
            console.log(">>json", json);
            if (json.type === 'error') {
                return dispatch({type: ACCOUNT_ACTION_TYPE.FETCH_FAILED, message: json.message});
            } else {

                return dispatch({
                    type: SUCCESS_TYPE,
                    ...json
                })
            }
        })
        .catch(error => dispatch({type: ACCOUNT_ACTION_TYPE.FETCH_FAILED, message: error.message}))
}
export const signup = ({username, password}) => fetchFromAccount({
    endpoint: 'signup',
    options: {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password}),
        credentials: 'include'
    },
    SUCCESS_TYPE: ACCOUNT_ACTION_TYPE.FETCH_SUCCEEDED
});

export const signout = () => fetchFromAccount({
    endpoint: 'sgnout',
    options: {
        credentials: 'include'
    },
    SUCCESS_TYPE: ACCOUNT_ACTION_TYPE.LOGOUT_SUCCESS
});

// export const signup = ({username, password}) => dispatch => { dispatch({type:
// ACCOUNT_ACTION_TYPE.FETCH_STARTED})     return
// fetch(`${BACKEND.ADDRESS}/account/signup`, {         method: 'POST', headers:
// {             'Content-Type': 'application/json'         }, body:
// JSON.stringify({username, password}),             credentials: 'include'
// })         .then(response => response.json()) .then(json => {
// console.log(">>json", json);             if (json.type === 'error') {
// return dispatch({type: ACCOUNT_ACTION_TYPE.FETCH_FAILED, message:
// json.message});             } else {                 return dispatch({
//       type: ACCOUNT_ACTION_TYPE.FETCH_SUCCEEDED, ...json    })             }
//        })         .catch(error => dispatch({type:
// ACCOUNT_ACTION_TYPE.FETCH_FAILED, message: error.message})) } export const
// signout = () => dispatch => {     dispatch({type:
// ACCOUNT_ACTION_TYPE.FETCH_STARTED});     return
// fetch(`${BACKEND.ADDRESS}/account/signout`, {credentials: 'include'})
// .then(response => response.json())         .then(json => {             if
// (json.type = 'error') {                 dispatch({type:
// ACCOUNT_ACTION_TYPE.FETCH_FAILED, message: json.message});             } else
// {                 dispatch({                     type:
// ACCOUNT_ACTION_TYPE.LOGOUT_SUCCESS,                     ...json   })    }
//     })         .catch(error => dispatch({type:
// ACCOUNT_ACTION_TYPE.FETCH_FAILED, message: error.message})); }

export const signin = ({username, password}) => dispatch => {}