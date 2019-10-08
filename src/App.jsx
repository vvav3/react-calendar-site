import React, { Suspense, useContext } from "react";
import { Switch, Route, Redirect } from "react-router";

import "App.scss";
import AuthContext from "contexts/AuthContext";
import AppContainer from "containers/AppContainer/AppContainer";
import AuthContainer from "containers/AuthContainer/AuthContainer";
import Spinner from "components/Spinner";

const Login = React.lazy(() => import("views/Login"));
const Calendar = React.lazy(() => import("views/Calendar"));

const ProtectedRoute = ({ component: Component, allow, redirect = "/sign-in", ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (allow ? <Component {...props} /> : <Redirect to={redirect} />)}
    />
  );
};

const App = () => {
  const { isAuthorized } = useContext(AuthContext);
  const Container = isAuthorized ? AppContainer : AuthContainer;

  return (
    <div className="app">
      <Container>
        <Suspense fallback={<Spinner id="suspense-spinner" />}>
          <Switch>
            <ProtectedRoute
              path="/sign-in"
              component={Login}
              allow={!isAuthorized}
              redirect="/"
              exact
            />
            <ProtectedRoute
              path="/"
              component={Calendar}
              allow={isAuthorized}
              redirect="/sign-in"
              exact
            />
            <Route render={() => <Redirect to={isAuthorized ? "/" : "sign-in"} />} />
          </Switch>
        </Suspense>
      </Container>
    </div>
  );
};

export default App;
