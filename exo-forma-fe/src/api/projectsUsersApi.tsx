import { rootApi } from "./rootApi";
import { Project, ProjectUser, Steps, User } from "../types/models";
import { CHECK_USER_API, GET_PROJECT_BY_PATH, GET_PROJECTS_API, GET_STEP_BY_NUMBER, GET_STEPS_BY_ID, UPDATE_LAST_STEP } from "./apiConstants";


const projectsUserApi = rootApi.injectEndpoints({
  endpoints: build => ({
      updateLastStep: build.mutation<ProjectUser,ProjectUser>({
        query: (rq) => ({
          url: UPDATE_LAST_STEP,
          method: "POST",
          body: rq
        })
      })
    }),
  overrideExisting: false
});
export const { useUpdateLastStepMutation } = projectsUserApi;
