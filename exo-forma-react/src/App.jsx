import React from 'react';

import './App.css';
import {useKeycloak} from "@react-keycloak/web";
import {Container, Modal} from "react-bootstrap";
import {AppRoutes} from "./routes/AppRoutes";

export const App = () => {
    const {keycloak} = useKeycloak()
    const isLoggedIn = keycloak.authenticated
    return isLoggedIn === undefined ? (
        <Modal size={'sm'} show={true} centered>
            <Container fluid className="d-flex justify-content-center align-items-center flex-column">
                <h4>Loading...</h4>
            </Container>
        </Modal>
    ) : <AppRoutes/>

}

export default App;
