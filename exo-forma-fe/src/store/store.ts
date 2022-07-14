import { configureStore } from '@reduxjs/toolkit'
import { createMemoryHistory } from 'history'
import { reduxBatch } from '@manaflair/redux-batch'
import { persistReducer, persistStore } from 'redux-persist'
import { PersistConfig, Persistor } from 'redux-persist/es/types'
import sessionStorage from 'redux-persist/es/storage/session'
import createSagaMiddleware from 'redux-saga'
import { createRootReducer } from './reducers'
import { rootSagas } from '../saga'

export const history = createMemoryHistory()
const persistConfig: PersistConfig<any> = {
    key: 'root',
    storage: sessionStorage
}

const persistedReducer = persistReducer(persistConfig, createRootReducer())
const sagaMiddleware = createSagaMiddleware()

export const sagaAction = (type: string, payload?: any, callback?: Function, failedCallback?: Function) => {
    const action = { type, payload }
    if (callback) {
        action.payload.callback = callback
    }
    if (failedCallback) {
        action.payload.failedCallback = failedCallback
    }
    store.dispatch(action)
}
export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(sagaMiddleware),
    devTools: true,
    enhancers: [reduxBatch]
})
sagaMiddleware.run(rootSagas)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const persistorApp: Persistor = persistStore(store)
