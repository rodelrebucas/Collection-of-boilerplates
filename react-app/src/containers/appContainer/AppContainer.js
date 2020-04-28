import React, { useContext } from 'react';
import '../../App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminRoutes from '../admin/routes';
import RestaurantRoutes from '../user/routes';
import Login from '../auth/Login';
import { Error404 } from '../errors';
import Index from './index/Index';
import { AuthContext } from '../auth/AuthContextProvider';

const App = () => {
  const auth = useContext(AuthContext);
  let userRoutes;
  let loginRoute;

  if (auth.isAuthenticated && !auth.isAdmin)
    userRoutes = <Route path="/user" component={RestaurantRoutes} />;
  if (auth.isAuthenticated && auth.isAdmin)
    userRoutes = <Route path="/admin" component={AdminRoutes} />;
  if (!auth.fetching && !auth.isAuthenticated)
    loginRoute = <Route exact path="/login" component={Login} />;
  return (
    <Switch>
      {userRoutes}
      {loginRoute}
      <Route exact path="/" component={Index} />
      <Route component={Error404} />
    </Switch>
  );
};

export default App;
