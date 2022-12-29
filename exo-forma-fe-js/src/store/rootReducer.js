
import {combineReducers} from "@reduxjs/toolkit";
import {rootApi} from "../api/rootApi";
import selectedProject from '../slices/projectSlice'
import selectedStep from '../slices/stepSlice'
export const createRootReducer = () =>
    combineReducers({
        [rootApi.reducerPath]: rootApi.reducer,
        currentProject: selectedProject,
        currentStep: selectedStep,
    })
