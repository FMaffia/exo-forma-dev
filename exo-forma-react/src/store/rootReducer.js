import {combineReducers} from '@reduxjs/toolkit'
import {rootApi} from '../api/rootApi'
import uiSlice from '../slices/uiSlice'

export const createRootReducer = () =>
    combineReducers({
        [rootApi.reducerPath]: rootApi.reducer,
        ui: uiSlice
    })
