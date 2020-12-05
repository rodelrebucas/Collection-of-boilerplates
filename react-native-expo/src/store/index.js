import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import createRootReducer from "./reducer";
import rootSaga from "./saga";
import { persistStore } from "redux-persist";

let store;
let persistor;

export default () => {
  const sagaMiddleware = createSagaMiddleware();
  // eslint-disable-next-line no-undef
  const middlewares = [sagaMiddleware];
  store = createStore(
    createRootReducer(),
    // composeWithDevTools(applyMiddleware(...middlewares)),
    applyMiddleware(...middlewares)
  );
  persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
};

export { store, persistor };
