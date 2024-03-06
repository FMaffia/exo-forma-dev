import React from 'react';
import './css/App.css';
import {useKeycloak} from "@react-keycloak/web";
import {AppRoutes} from "./routes/AppRoutes";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import '../src/assets/css/style.scss'
import LoadingModal from "./components/LoadingModal";

export const App = () => {
    const {keycloak} = useKeycloak()
    const isLoggedIn = keycloak.authenticated
    return isLoggedIn === undefined ? (

        <LoadingModal/>
    ) : <AppRoutes/>

}

export default App;
