import React from 'react'

import { useKeycloak } from '@react-keycloak/web'
import Container from 'react-bootstrap/Container'
import { Button } from 'react-bootstrap'

const UnauthorizedPage = () => {
    const { keycloak } = useKeycloak()

    return (
        <Container
            style={{
                display: 'flex',
                flexDirection: 'column',
                whiteSpace: 'no-wrap',
                alignItems: 'center',
                margin: 'auto',
                padding: 2
            }}
        >
            <span className={'d-block'} sx={{ fontWeight: 'bold', fontSize: '1.2rem' }} color={'red'}>
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
    )
}

export default UnauthorizedPage
