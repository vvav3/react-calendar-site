import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const SignInView = React.lazy(() => import("./views/SignIn"));
const CalendarView = React.lazy(() => import("./views/Calendar"));

const ProtectedRoute = ({ component: Component, allow, redirect = "/sign-in", ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (allow ? <Component {...props} /> : <Redirect to={redirect} />)}
    />
  );
};

const AppRouter = ({ isAuthorized }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <ProtectedRoute
        path="/sign-in"
        component={SignInView}
        allow={!isAuthorized}
        redirect="/"
        exact
      />
      <ProtectedRoute
        path="/"
        component={CalendarView}
        allow={isAuthorized}
        redirect="/sign-in"
        exact
      />
      <Route render={() => <Redirect to={isAuthorized ? "/" : "sign-in"} />} />
    </Switch>
  </Suspense>
);

export default AppRouter;
