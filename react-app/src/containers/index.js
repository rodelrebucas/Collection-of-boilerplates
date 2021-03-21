import React from "react";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import AdminComponent from "./Admin/Admin";
import UserComponent from "./User/User";
import Error404 from "../core/components/errors";

const DEFAULT_REDIRECT_TO = "/login";

/** Accessing protected routes
 *  should wait for authentication service
 *  before deciding which route to show.
 */

// TODO: fix eslint errors
/* eslint-disable react/prop-types */
/* eslint-disable no-constant-condition */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable no-else-return */
const ProtectedRoutes = ({ children, path }) => {
  return (
    <Route
      path={path}
      render={() => {
        if (!true)
          if (true)
            // not loading
            // authenticated
            /** Children  is either nested routes or component  or */
            return <>{children}</>;
          /** Unathenticated request should redirect to login */ else
            return (
              <Redirect
                to={{
                  exact: true,
                  pathname: DEFAULT_REDIRECT_TO,
                }}
              />
            );
        else {
          /** Create loader while waiting for authentication */
          return <h1>Loading...</h1>;
        }
      }}
    />
  );
};

const ChildrenRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      {true ? (
        <Route path={`${path}/admin`} component={AdminComponent} /> // admin routes
      ) : (
        <Route path={`${path}/user`} component={UserComponent} /> // non admin
      )}
      {/* Catch all routes on /member/!admin || !user */}
      <Route component={Error404} />
    </Switch>
  );
};

const LoginComponent = () => {
  return (
    <>
      <h1>Login Form</h1>
    </>
  );
};

const App = () => {
  const history = useHistory();
  return (
    <div>
      <Switch>
        {/* Root route for testing routes */}
        <Route
          exact
          path="/"
          render={() => (
            <>
              <button onClick={() => history.push("/member/admin")}>
                to admin
              </button>
              <button onClick={() => history.push("/  ")}>to login</button>
            </>
          )}
        />

        {/* Remove login route if authenticated */}
        {true ? null : ( // true - authenticated otherwise false
          <Route exact path="/login" component={LoginComponent} />
        )}

        {/* Protect all routes inside */}
        <ProtectedRoutes path="/member">
          <ChildrenRoutes />
        </ProtectedRoutes>

        {/* Catch all routes */}
        <Route component={Error404} />
      </Switch>
    </div>
  );
};

export default App;
