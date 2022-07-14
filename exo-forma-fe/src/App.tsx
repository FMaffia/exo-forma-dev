import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { persistorApp, sagaAction, store } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import './App.css'
import { SAGA_USER } from './saga/userSaga'
import { User } from './model/models'
import { ReactLocation, Router } from '@tanstack/react-location'
import { Layout, NoLayout } from './layout/Layout'
import { privateRoutes, publicRoutes } from './utility/RoutesMap'

const WrapperApp: React.FC = () => {
    const location = new ReactLocation()
    const isLoggedIn: boolean = true

    const userMock: User = {
        email: 'edo.galizia@exolab.it',
        pass: '12345'
    }

    useEffect(() => {
        sagaAction(SAGA_USER.CHECK_USER, userMock)
    }, [])
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistorApp}>
                {isLoggedIn ? (
                    <Router location={location} routes={privateRoutes}>
                        <Layout />
                    </Router>
                ) : (
                    <Router location={location} routes={publicRoutes}>
                        <NoLayout />
                    </Router>
                )}
            </PersistGate>
        </Provider>
    )
}
export default WrapperApp
