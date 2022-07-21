import React from 'react'
import { Provider } from 'react-redux'
import { persistorApp, store } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import './App.css'
import { ReactLocation, Router } from '@tanstack/react-location'
import { Layout, NoLayout } from './layout/Layout'
import { privateRoutes, publicRoutes } from './utility/RoutesMap'

const WrapperApp: React.FC = () => {
    const location = new ReactLocation()
    const isLoggedIn: boolean = true

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
