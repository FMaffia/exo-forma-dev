import './App.css'
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web'
import useKeyRoles from './hooks/useKeyRoles'
import { Backdrop, CircularProgress } from '@mui/material'
import PublicLayout from './layout/PublicLayout'
import { keyCloak } from './constants/Constants'
import UnauthorizedPage from './pages/UnauthorizedPage'
import * as UserRoles from './constants/UserRole'
import PrivateLayout from './layout/PrivateLayout'
import LogoutPage from './pages/LogoutPage'
import 'bootstrap/dist/css/bootstrap.min.css'

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
        <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={true} onClick={() => null}>
            <CircularProgress color="secondary" sx={{ mr: 1 }} />
        </Backdrop>
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
