import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useKeycloak } from '@react-keycloak/web'
import useKeyRoles from './hooks/useKeyRoles'
import PublicLayout from './layout/PublicLayout'
import UnauthorizedPage from './pages/UnauthorizedPage'
import * as UserRoles from './constants/UserRole'
import LogoutPage from './pages/LogoutPage'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import React from 'react'
import AppRoutes from './routes/AppRoutes'

const KeycloackApp = () => {
    return (
        <div>Ciao</div>
        /*<ReactKeycloakProvider authClient={keyCloak}>
        <Logged />
    </ReactKeycloakProvider>*/
    )
}
const Logged = () => {
    const { keycloak } = useKeycloak()
    const isLoggedIn = keycloak.authenticated
    const role = useKeyRoles()

    return isLoggedIn === undefined ? (
        <Modal size={'sm'} show={true} centered>
            <Container fluid className="d-flex justify-content-center align-items-center flex-column">
                <h4>Loading...</h4>
            </Container>
        </Modal>
    ) : isLoggedIn ? (
        role === UserRoles.UNAUTHORIZED ? (
            <PublicLayout>
                <UnauthorizedPage />
            </PublicLayout>
        ) : (
            <AppRoutes />
        )
    ) : (
        <PublicLayout>
            <LogoutPage />
        </PublicLayout>
    )
}

export default KeycloackApp
