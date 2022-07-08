import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import { User } from '../../model/models'

const userSlice: Slice<User> = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            return action.payload
        }
    }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
