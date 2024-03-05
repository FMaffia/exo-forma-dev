import React from 'react';
import {Button, Container} from "react-bootstrap";
import {useKeycloak} from "@react-keycloak/web";

const UnauthorizedPage = () => {
    const {keycloak} = useKeycloak()

    return <Container>
            <span className={'d-block'} color={'red'}>
                Non sei autorizzato ad accedere a questa applicazione.
            </span>
        <Button
            color={'primary'}
            onClick={async () => {
                await keycloak.logout()
            }}
        >
            Ritorna alla login
        </Button>
    </Container>
};

export default UnauthorizedPage;
