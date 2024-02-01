import { createSlice } from '@reduxjs/toolkit'
import { MenuFilter } from '../models/menuItems'

const uiSlice = createSlice({
    name: 'uiSlice',
    initialState: {
        filterProject: MenuFilter.TUTTI
    },
    reducers: {
        setFilterProject(state, { payload }) {
            state.filterProject = payload
        }
    }
})

export const { setFilterProject } = uiSlice.actions
export default uiSlice.reducer
