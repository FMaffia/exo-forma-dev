import React from 'react';
import {CONTEXT_ROOT} from "../constants/Paths";
import {Button, Container} from "react-bootstrap";
import {useKeycloak} from "@react-keycloak/web";

const LogoutPage = () => {
    const {keycloak} = useKeycloak()

    return (
        <Container>
            <span className={'d-block'}>
                Fare la login per accedere all'applicazione
            </span>
            <Button color={'primary'} onClick={() => keycloak.login({redirectUri: CONTEXT_ROOT})}>
                Login
            </Button>
        </Container>)
};

export default LogoutPage;
