import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./App";

// import { AuthProvider } from "./context/AuthContext";

const app = (
  <BrowserRouter>
    {/* <AuthProvider> */}
      <App />
    {/* </AuthProvider> */}
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById("root"));

serviceWorker.register();
