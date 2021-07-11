import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware } from "redux";
import { loadState, saveState } from "./localStorage";
import { logger } from "redux-logger";

import rootReducer from "./reducers/rootReducer";
import { Provider } from "react-redux";

export const store = createStore(
  rootReducer,
  loadState(),
  applyMiddleware(logger) //redux logger to show the changes
  //in state of the redux store in the console
);

store.subscribe(() => {
  const storestate = store.getState();
  saveState(storestate); // saves the redux store
});


 

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
