import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { Project } from "../../model/models";

const projectsState: Project[] = [];

const projectSlice: Slice<Project[]> = createSlice({
  name: "projects",
  initialState: projectsState,
  reducers: {
    setProjects(state, action: PayloadAction<Project[]>) {
      return action.payload;
    },
  },
});

export const { setProjects } = projectSlice.actions;
export default projectSlice.reducer;
