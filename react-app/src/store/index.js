import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
// import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { persistStore } from "redux-persist";
import { routerMiddleware } from "connected-react-router";
import createRootReducer, { history } from "./reducer";
import rootSaga from "./saga";

export default () => {
  const sagaMiddleware = createSagaMiddleware();
  // eslint-disable-next-line no-undef
  const middlewares = [sagaMiddleware, routerMiddleware(history)];
  const store = createStore(
    createRootReducer(),
    // composeWithDevTools(applyMiddleware(...middlewares)),
    applyMiddleware(...middlewares),
  );
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);

  return { store, persistor, history };
};
