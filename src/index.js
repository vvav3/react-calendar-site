import "./bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router } from "react-router";

import * as serviceWorker from "./serviceWorker";
import App from "./App";
import { ContextWrapper as AuthContextWrapper } from "./context/AuthContext";

const history = createBrowserHistory();

const app = (
  <Router history={history}>
    <AuthContextWrapper>
      <App />
    </AuthContextWrapper>
  </Router>
);

ReactDOM.render(app, document.getElementById("root"));

serviceWorker.register();
