import React, { useContext } from "react";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import AdminComponent from "./admin";
import UserComponent from "./user";
import { Error404 } from "./errors";
import { AuthContext } from "./auth/AuthContextProvider";

const DEFAULT_REDIRECT_TO = "/login";

/** Accessing protected routes
 *  should wait for authentication service
 *  before deciding which route to show.
 */
const ProtectedRoutes = ({ children, path }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  return (
    <Route
      path={path}
      render={() => {
        if (!isLoading)
          if (isAuthenticated)
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
  const { isAdmin } = useContext(AuthContext);
  const { path } = useRouteMatch();
  return (
    <Switch>
      {isAdmin ? (
        <Route path={`${path}/admin`} component={AdminComponent} />
      ) : (
        <Route path={`${path}/user`} component={UserComponent} />
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
  const { isAuthenticated } = useContext(AuthContext);
  return (
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
            <button onClick={() => history.push("/login")}>to login</button>
          </>
        )}
      />

      {/* Remove login route if authenticated*/}
      {isAuthenticated ? null : (
        <Route exact path="/login" component={LoginComponent} />
      )}

      {/* Protect all routes inside */}
      <ProtectedRoutes path="/member">
        <ChildrenRoutes />
      </ProtectedRoutes>

      {/* Catch all routes */}
      <Route component={Error404} />
    </Switch>
  );
};

export default App;
