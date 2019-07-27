import React from "react";
import { render } from "react-dom";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";
import { fetchAuthenticated } from "./action/account";
import Root from "./components/Root";

import "./index.css";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
// https://github.com/jhen0409/react-native-debugger/issues/280

store.dispatch(fetchAuthenticated()).then(() => {
  // no need for connect because here we have direct access to the store
  render(
    <Provider store={store}>
      <Root />
    </Provider>,
    document.querySelector("#root")
  );
});
