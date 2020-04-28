import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Error404 } from '../errors';

const Routes = () => (
  <Switch>
    <Route
      exact
      path="/admin/home/"
      render={() => (
        <>
          <h1>Admin Home</h1>
        </>
      )}
    />
    <Route component={Error404} />
  </Switch>
);

export default Routes;
