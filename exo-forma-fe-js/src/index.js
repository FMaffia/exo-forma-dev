import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import KeycloackApp from './App';
import {persistorApp, store} from "./store/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistorApp}>
            <BrowserRouter> <KeycloackApp/></BrowserRouter>
        </PersistGate>
    </Provider>
);

