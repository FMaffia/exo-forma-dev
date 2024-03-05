import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {BrowserRouter} from 'react-router-dom'
import App from "./App.jsx"
import {persistorApp, store} from "./store/store.js";
import {keyCloak} from "./constants/Constants";
import {ReactKeycloakProvider} from "@react-keycloak/web";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistorApp}>
            <ReactKeycloakProvider authClient={keyCloak}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ReactKeycloakProvider>
        </PersistGate>
    </Provider>
);

