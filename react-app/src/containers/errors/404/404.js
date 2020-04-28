import React, { useContext } from 'react';
import Error404Page from './Error404Page';
import { AuthContext } from '../../auth/AuthContextProvider';

const Error404 = () => {
  const auth = useContext(AuthContext);

  if (!auth.fetching) return <Error404Page />;
  return null;
};

export default Error404;
