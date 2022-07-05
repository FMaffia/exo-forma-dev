import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { persistorApp, sagaAction, store } from "./store/store";
import firebase from "firebase/compat/app";
import { config } from "./firebase/config";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import LoginContainer from "./containers/LoginContainer";
import * as ROUTES_CONSTANTS from "./utility/Routes";
import { PROJECT_ROOT, USER_ROOT } from "./utility/Routes";
import NavigationDrawer from "./containers/NavigationDrawer";
import HomePage from "./pages/HomePage";
import RicercaPage from "./pages/RicercaPage";
import Layout from "./layout/Layout";
import DetailsPage from "./pages/DetailsPage";
import { SAGA_USER } from "./saga/userSaga";
import { User } from "./model/models";

firebase.initializeApp(config);

const WrapperApp: React.FC = () => {
  const isLoggedIn: boolean = true;
  const root: string = ROUTES_CONSTANTS.LOGIN_ROOT;

  const userMock: User = {
    email: "edo.galizia@exolab.it",
    pass: "12345",
  };

  useEffect(() => {
    sagaAction(SAGA_USER.CHECK_USER, userMock);
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistorApp}>
        <BrowserRouter>
          <Routes>
            <Route
              path={ROUTES_CONSTANTS.LOGIN_ROOT}
              element={<LoginContainer />}
            />
            <Route
              path="/"
              element={isLoggedIn ? <Layout /> : <Navigate to={root} replace />}
            >
              <Route index element={<HomePage />} />
              <Route path={PROJECT_ROOT}>
                <Route path=":projectPath" element={<DetailsPage />} />
                <Route index element={<RicercaPage />} />
              </Route>
              <Route path={USER_ROOT} element={<NavigationDrawer />}>
                <Route index element={<h1>Mio profilo </h1>} />
              </Route>
              <Route
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>There's nothing here!</p>
                  </main>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};
export default WrapperApp;
