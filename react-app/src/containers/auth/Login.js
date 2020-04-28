import React, { useCallback, useContext } from 'react';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from './AuthContextProvider';

const Login = props => {
  const auth = useContext(AuthContext);

  const submit = useCallback(
    async ({ email, password }) => {
      const { error, isAdmin } = { email: '', password: '' }; // replace with login service functionality
      const goToRoot = () => props.history.push('/');
      if (error) return auth.dispatch({ type: 'error', payload: error });
      goToRoot();
      return auth.dispatch({ type: 'authenticated', payload: { isAdmin } });
    },
    [auth, props.history],
  );

  return (
    <Route
      exact
      path="/login"
      render={() => (
        <>
          <h1>Login Form</h1>
        </>
      )}
    />
  );
};

Login.defaultProps = {};

Login.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.any.isRequired,
};

export default withRouter(React.memo(Login));
