import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import AuthContext from "./context/AuthContext";

const SignInView = React.lazy(() => import("./views/SignInView"));
const CalendarView = React.lazy(() => import("./views/CalendarView"));

const ProtectedRoute = ({ component: Component, allow, redirect = "/sign-in", ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (allow ? <Component {...props} /> : <Redirect to={redirect} />)}
    />
  );
};

const AppRouter = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <AuthContext.Consumer>
      {({ isAuthorized }) => (
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
      )}
    </AuthContext.Consumer>
  </Suspense>
);

export default AppRouter;

// import React, { Component, Suspense } from "react";
// import { Switch, Route, Redirect } from "react-router-dom";
// import AuthContext from "./context/AuthContext";

// const SignInView = React.lazy(() => import("./views/SignIn"));
// const CalendarView = React.lazy(() => import("./views/Calendar"));

// const ProtectedRoute = ({ component: Component, allow, redirect = "/sign-in", ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={props => (allow ? <Component {...props} /> : <Redirect to={redirect} />)}
//     />
//   );
// };

// class AppRouter extends Component {
//   render() {
//     console.log(this);
//     const isAuthorized = true;
//     return (
//       <Suspense fallback={<div>Loading...</div>}>
//         <Switch>
//           <ProtectedRoute
//             path="/sign-in"
//             component={SignInView}
//             allow={!isAuthorized}
//             redirect="/"
//             exact
//           />
//           <ProtectedRoute
//             path="/"
//             component={CalendarView}
//             allow={isAuthorized}
//             redirect="/sign-in"
//             exact
//           />
//           <Route render={() => <Redirect to={isAuthorized ? "/" : "sign-in"} />} />
//         </Switch>
//       </Suspense>
//     );
//   }
// }

// AppRouter.contextType = AuthContext;

// export default AppRouter;
