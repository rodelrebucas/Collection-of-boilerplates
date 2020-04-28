import React, { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContextProvider';
import './styles.scss';

const ErrorMessage = React.memo(() => {
  const auth = useContext(AuthContext);
  const error =
    auth.error.trim() !== '' ? (
      <div className="errorMessageContainer">
        <h5 className="errorMessage">{auth.error}</h5>
      </div>
    ) : (
      ''
    );
  return error;
});

export default ErrorMessage;
