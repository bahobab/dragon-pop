import React from 'react';
import {render} from 'react-dom';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import Root from './components/Root';

// import {generationReducer} from './reducers'; import
// {generationActionCreator} from './action/generation';

import rootReducer from './reducers';

import './index.css';

const store = createStore(rootReducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
// https://github.com/jhen0409/react-native-debugger/issues/280

store.subscribe(() => console.log('subcribe store', store.getState()));

// fetch('http://localhost:3003/generation')     .then(response =>
// response.json())     .then(json =>
// store.dispatch(generationActionCreator(json.generation)))     .catch(error =>
// console.error(error));

render(
    <Provider store={store}>
    <Root/>
</Provider>, document.querySelector('#root'));