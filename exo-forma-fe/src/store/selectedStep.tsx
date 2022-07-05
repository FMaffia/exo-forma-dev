import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { StepProject } from "../model/models";

const currentStepState: StepProject = {
  attachment: undefined,
  completed: false,
  desc: "",
  link: "",
  number: 1,
  title: "",
};

const currentStepSlice: Slice<StepProject> = createSlice({
  name: "currentStep",
  initialState: currentStepState,
  reducers: {
    setCurrentStep(state, action: PayloadAction<StepProject>) {
      return action.payload;
    },
  },
});

export const { setCurrentStep } = currentStepSlice.actions;
export default currentStepSlice.reducer;
