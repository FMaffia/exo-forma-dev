import { combineReducers } from 'redux'
import uiReducer from './uiReducer'
import selectedProject from './selectedProject'
import selectedStep from '../selectedStep'
import { rootApi } from '../../api/rootApi'

export const createRootReducer = () =>
    combineReducers({
        [rootApi.reducerPath]: rootApi.reducer,
        ui: uiReducer,
        currentStep: selectedStep,
        selectedProjects: selectedProject
    })
