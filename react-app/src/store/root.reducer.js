import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

export default (history) => {
  const reducers = {
    router: connectRouter(history),
  };
  return combineReducers(reducers);
};
