import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { emptyProject, Project, StepView } from "../../model/models";

const selectedProjectState: Project = emptyProject;

const selectedProjectSlice: Slice<Project> = createSlice({
  name: "selectedProjects",
  initialState: selectedProjectState,
  reducers: {
    setSelectedProject(state, action: PayloadAction<Project>) {
      return action.payload;
    },
    setStepsByProject(state, action: PayloadAction<StepView[]>) {
      state.steps = action.payload;
    },
  },
});

export const { setSelectedProject, setStepsByProject } =
  selectedProjectSlice.actions;
export default selectedProjectSlice.reducer;
