import { combineReducers } from '@reduxjs/toolkit'
import { rootApi } from '../api/rootApi'
import selectedProject from '../slices/projectSlice'
import selectedStep from '../slices/stepSlice'
import backupProject from '../slices/backupProjectSlice'
import uiSlice from '../slices/uiSlice'

export const createRootReducer = () =>
    combineReducers({
        [rootApi.reducerPath]: rootApi.reducer,
        ui: uiSlice,
        currentProject: selectedProject,
        currentStep: selectedStep,
        backupProject: backupProject
    })
