import {createSlice} from '@reduxjs/toolkit'


const backupProjectSlice = createSlice({
    name: 'backupProjectSlice',
    initialState: {},
    reducers: {
        setBackupProject(state, action) {
            return action.payload
        },
        resetBackupProject(state) {
            return {}
        },
    }
})

export const {setBackupProject, resetBackupProject} = backupProjectSlice.actions
export default backupProjectSlice.reducer
