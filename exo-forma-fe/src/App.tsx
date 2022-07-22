import React from 'react'
import { Provider } from 'react-redux'
import { persistorApp, store } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import './App.css'
import { Layout, NoLayout } from './layout/Layout'

const WrapperApp: React.FC = () => {
    const isLoggedIn: boolean = true

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistorApp}>
                {isLoggedIn ? <Layout /> : <NoLayout />}
            </PersistGate>
        </Provider>
    )
}
export default WrapperApp
