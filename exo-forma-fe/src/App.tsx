import React from 'react'
import { Provider } from 'react-redux'
import { persistorApp, store } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import './App.css'
import { Layout } from './layout/Layout'
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web'
import { keyCloak } from './utility/Constant'
import { Backdrop, CircularProgress } from '@mui/material'
import PublicLayout from './containers/PublicContainer'
import useKeyRoles from './utility/useKeyRoles'
import UnauthorizedPage from './containers/pages/UnauthorizedPage'
import LogoutPage from './containers/pages/LogoutPage'

const WrapperApp: React.FC = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistorApp}>
                <ReactKeycloakProvider authClient={keyCloak}>
                    <Logged />
                </ReactKeycloakProvider>
            </PersistGate>
        </Provider>
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
        role === 'UNAUTHORIZED' ? (
            <PublicLayout>
                <UnauthorizedPage />
            </PublicLayout>
        ) : (
            <Layout />
        )
    ) : (
        <PublicLayout>
            <LogoutPage />
        </PublicLayout>
    )
}

export default WrapperApp
