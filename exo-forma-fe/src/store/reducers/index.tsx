import { combineReducers } from "redux";
import uiReducer from "./uiReducer";
import userReducer from "./userReducer";
import projectsReducer from "./projectsReducer";
import selectedProject from "./selectedProject";
import selectedStep from "../selectedStep";

export const createRootReducer = () =>
  combineReducers({
    ui: uiReducer,
    user: userReducer,
    currentStep: selectedStep,
    selectedProjects: selectedProject,
    projects: projectsReducer,
    filteredProjects: projectsReducer,
  });
