import { rootApi } from "./rootApi";
import {  ProjectUser, Steps } from "../types/models";
import {  UPDATE_LAST_STEP } from "./apiConstants";


const projectsUserApi = rootApi.injectEndpoints({
  endpoints: build => ({
      updateLastStep: build.mutation<ProjectUser,ProjectUser>({
        query: (rq) => ({
          url: UPDATE_LAST_STEP,
          method: "POST",
          body: rq
        }),
        invalidatesTags: ['Steps','Detail']
      })
    }),
  overrideExisting: false
});
export const { useUpdateLastStepMutation } = projectsUserApi;
