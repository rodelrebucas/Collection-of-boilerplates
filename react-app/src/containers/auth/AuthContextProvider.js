import React, { useReducer, createContext, useEffect } from "react";

export const AuthContext = createContext({});

const initialState = {
  isLoading: true,
  isAuthenticated: false,
  error: "",
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "authenticated":
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        fetching: action.payload.fetching,
        isAdmin: action.payload.isAdmin,
        error: "",
      };
    case "logout":
      return {
        ...state,
        isAuthenticated: false,
        isAdmin: false,
        error: "",
        fetching: false,
      };
    case "loading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "error":
      return { ...state, error: action.payload };
    default:
      throw new Error();
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  /** Runs on every new page once to check if user exist */
  useEffect(() => {
    dispatch({
      type: "authenticated",
      payload: {
        isAuthenticated: true,
        error: "",
        isAdmin: false,
        fetching: false,
      },
    });
    dispatch({ type: "loading", payload: false });
  }, []);

  const { isAuthenticated, isLoading, isAdmin, error } = state;

  return (
    <AuthContext.Provider
      value={{ isAdmin, isAuthenticated, dispatch, error, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };
