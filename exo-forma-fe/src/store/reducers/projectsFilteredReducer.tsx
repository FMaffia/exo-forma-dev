import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { Project } from "../../model/models";

const projectsState: Project[] = [];

const projectSlice: Slice<Project[]> = createSlice({
  name: "filteredProjects",
  initialState: projectsState,
  reducers: {
    setFilteredProjects(state, action: PayloadAction<Project[]>) {
      return action.payload;
    },
  },
});

export const { setFilteredProjects } = projectSlice.actions;
export default projectSlice.reducer;
