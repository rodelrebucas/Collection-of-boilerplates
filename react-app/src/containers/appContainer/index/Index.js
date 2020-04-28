import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContextProvider';

export default () => {
  const auth = useContext(AuthContext);
  const [comp, setComp] = useState(null);

  useEffect(() => {
    if (auth.isAuthenticated && auth.isAdmin)
      setComp(<Redirect to="/admin/home" />);
    if (auth.isAuthenticated && !auth.isAdmin)
      setComp(<Redirect to="/user/home" />);
    if (!auth.fetching && !auth.isAuthenticated)
      setComp(<Redirect to="/login" />);
  }, [auth]);

  return comp;
};
