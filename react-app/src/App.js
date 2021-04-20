import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { PersistGate } from "redux-persist/integration/react";
import Container from "./containers";
import setupStore from "./core/store";
import setUpApi from "./core/service/api";
import "./utils/i18n";
import "./App.scss";

setUpApi();
const { store, persistor, history } = setupStore();

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Container />
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);
