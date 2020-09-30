import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { PersistGate } from "redux-persist/integration/react";
import Container from "./containers";
import { AuthContextProvider } from "./containers/auth/AuthContextProvider";
import setupStore, { history, store, persistor } from "./store";
import setUpApi from "./service/api";
import "./utils/i18n";
import "./App.scss";

setUpApi();
setupStore();

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <AuthContextProvider>
          <Container />
        </AuthContextProvider>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);
