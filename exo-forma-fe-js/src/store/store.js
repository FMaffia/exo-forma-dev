import {configureStore} from "@reduxjs/toolkit";
import {rootApi} from "../api/rootApi";
import {createRootReducer} from "./rootReducer";
import {persistReducer, persistStore} from 'redux-persist'
import storage from "redux-persist/lib/storage/session"
import {reduxBatch} from '@manaflair/redux-batch'


const persistedReducer = persistReducer({
    key: 'root',
    storage: storage,
    blacklist: [rootApi.reducerPath]
}, createRootReducer())

export const store = configureStore(
    {
        reducer: persistedReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: false
            }).concat(rootApi.middleware),
        devTools: true,
        enhancers: [reduxBatch]
    }
)
export const persistorApp = persistStore(store)
