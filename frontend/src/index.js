import React from "react";
import { render } from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";

import rootReducer from "./reducers";
import { fetchAuthenticated } from "./action/account";

import Root from "./components/Root";
import AccountDragons from "./components/AccountDragons";

import "./index.css";

const history = createBrowserHistory();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
// https://github.com/jhen0409/react-native-debugger/issues/280

class RedirectToAccountDragons extends React.Component {
  render() {
    return <Redirect to={{ pathname: "/account-dragons" }} />;
  }
}

store.dispatch(fetchAuthenticated()).then(() => {
  // no need for connect because here we have direct access to the store
  render(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Root} />
          <Route path="/account-dragons" component={AccountDragons} />
          <Route
            path="/redirect-to-account-dragons"
            component={RedirectToAccountDragons}
          />
        </Switch>
      </Router>
    </Provider>,
    document.querySelector("#root")
  );
});
