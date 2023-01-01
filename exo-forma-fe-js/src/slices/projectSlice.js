import {createSlice} from '@reduxjs/toolkit'


const selectedProjectSlice = createSlice({
    name: 'selectedProjects',
    initialState: {},
    reducers: {
        setPartialProject(state, action) {
            state[action.payload.field] = action.payload.value
        },
        setSelectedProject(state, action) {
            return action.payload
        },
        setStepsByProject(state, action) {
            state.steps = action.payload
        },
        resetSelectedProject(state) {
            return {}
        },
    }
})

export const {
    setSelectedProject,
    setStepsByProject,
    resetSelectedProject,
    setPartialProject
} = selectedProjectSlice.actions
export default selectedProjectSlice.reducer
