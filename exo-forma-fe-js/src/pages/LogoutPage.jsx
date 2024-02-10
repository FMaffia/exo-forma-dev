import React from 'react'
import loginImg from '../img/log-in.png'
import { useKeycloak } from '@react-keycloak/web'
import Container from 'react-bootstrap/Container'
import { Button } from 'react-bootstrap'

const LogoutPage = () => {
    const { keycloak } = useKeycloak()

    return (
        <Container
            style={{
                display: 'flex',
                flexDirection: 'column',
                whiteSpace: 'no-wrap',
                alignItems: 'center',
                margin: 'auto'
            }}
        >
            <img style={{ padding: 1, margin: 'auto', height: '256px', width: 'auto' }} alt="Remy Sharp" src={loginImg} />

            <span className={'d-block'} style={{ fontWeight: 'bold', fontSize: '1.2rem' }} color={'primary'}>
                Fare la login per accedere al'applicazione
            </span>
            <Button color={'primary'} onClick={() => keycloak.login({ redirectUri: 'http://localhost:3000' })}>
                Login
            </Button>
        </Container>
    )
}

export default LogoutPage;
