import { createSlice } from '@reduxjs/toolkit'
const selectedProjectState  = {
    authors: "",
    carousel: [],
    categories: [],
    creationDate: "",
    desc: "",
    descBreve: "",
    difficult: 0,
    order: 0,
    path: "",
    published: false,
    steps: [],
    lastStep: 0,
    stepsCount: 0,
    title: ""
};

const selectedProjectSlice = createSlice({
    name: 'selectedProjects',
    initialState: selectedProjectState,
    reducers: {
        setSelectedProject(state, action) {
            return action.payload
        },
        setStepsByProject(state, action) {
            state.steps = action.payload
        }
    }
})

export const { setSelectedProject, setStepsByProject } = selectedProjectSlice.actions
export default selectedProjectSlice.reducer
