import React, { useContext, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { AuthContext } from './AuthContextProvider';

const LogoutButton = ({ className, ...props }) => {
  const auth = useContext(AuthContext);

  const handleLogout = useCallback(async () => {
    const goToLogin = () => props.history.replace('/login');
    const loggedOut = () => {}; // logout service functionality;
    if (loggedOut) {
      auth.dispatch({ type: 'logout' });
      goToLogin();
    }
  }, [auth, props.history]);

  return (
    <button type="button" onClick={handleLogout} className={className}>
      {props.children}
    </button>
  );
};

export default withRouter(React.memo(LogoutButton));
