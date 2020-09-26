import React, { useReducer, createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({});

const initialState = {
  fetching: true,
  isAuthenticated: false,
  error: '',
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'authenticated':
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        fetching: action.payload.fetching,
        isAdmin: action.payload.isAdmin,
        error: '',
      };
    case 'logout':
      return {
        ...state,
        isAuthenticated: false,
        isAdmin: false,
        error: '',
        fetching: false,
      };
    case 'error':
      return { ...state, error: action.payload };
    default:
      throw new Error();
  }
};

const AuthContextProvider = props => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [propsState, setProps] = useState(null);

  useEffect(() => {
    try {
      // check if user is already authenticated
      if (true) {
        dispatch({
          type: 'authenticated',
          payload: {
            isAuthenticated: true,
            error: '',
            isAdmin: true,
            fetching: false,
          },
        });
      } else {
        dispatch({
          type: 'authenticated',
          payload: {
            isAuthenticated: false,
            isAdmin: false,
            error: '',
            fetching: false,
          },
        });
      }
    } catch (err) {
      dispatch({
        type: 'authenticated',
        payload: {
          isAuthenticated: false,
          isAdmin: false,
          error: true,
          fetching: false,
        },
      });
    }
  }, [state.isAdmin, state.isAuthenticated]);

  const { isAuthenticated, isAdmin, error, fetching } = state;

  return (
    <AuthContext.Provider
      value={{ isAdmin, isAuthenticated, dispatch, error, fetching }}
    >
      {propsState}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };
