import { createSlice} from '@reduxjs/toolkit'

const currentStepState = {
    attachment: undefined,
    completed: false,
    desc: '',
    link: '',
    number: 1,
    title: ''
}
const currentStepSlice = createSlice({
    name: 'currentStep',
    initialState: currentStepState,
    reducers: {
        setCurrentStep(state, action) {
            return action.payload
        }
    }
})
export const { setCurrentStep } = currentStepSlice.actions
export default currentStepSlice.reducer