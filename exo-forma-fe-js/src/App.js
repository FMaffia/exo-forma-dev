import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web'
import useKeyRoles from './hooks/useKeyRoles'
import PublicLayout from './layout/PublicLayout'
import { keyCloak } from './constants/Constants'
import UnauthorizedPage from './pages/UnauthorizedPage'
import * as UserRoles from './constants/UserRole'
import PrivateLayout from './layout/PrivateLayout'
import LogoutPage from './pages/LogoutPage'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import loadingSrc from './img/loading.svg'
import 'react-circular-progressbar/dist/styles.css'

const KeycloackApp = () => {
    return (
        <ReactKeycloakProvider authClient={keyCloak}>
            <Logged />
        </ReactKeycloakProvider>
    )
}
const Logged = () => {
    const { keycloak } = useKeycloak()
    const isLoggedIn = keycloak.authenticated
    const role = useKeyRoles()
    return isLoggedIn === undefined ? (
        <Modal size={'sm'} show={true} centered>
            <Container fluid className="d-flex justify-content-center align-items-center flex-column">
                <img alt={''} src={loadingSrc} />
                <h4>Loading...</h4>
            </Container>
        </Modal>
    ) : isLoggedIn ? (
        role === UserRoles.UNAUTHORIZED ? (
            <PublicLayout>
                <UnauthorizedPage />
            </PublicLayout>
        ) : (
            <PrivateLayout />
        )
    ) : (
        <PublicLayout>
            <LogoutPage />
        </PublicLayout>
    )
}

export default KeycloackApp
