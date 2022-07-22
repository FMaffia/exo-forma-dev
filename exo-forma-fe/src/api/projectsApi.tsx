import { rootApi } from "./rootApi";
import { Project, Steps } from "../types/models";
import { GET_PROJECTS_API, GET_STEP_BY_NUMBER, GET_STEPS_BY_ID } from "./apiConstants";

type QueryArgs = {
  idProject: string | undefined
  number: number | undefined
}
const projectsApi = rootApi.injectEndpoints({
  endpoints: build => ({
    getProjects: build.query<Project[], null>({
      query: () => GET_PROJECTS_API
    }),
    getStepsById: build.query<Steps[], string | undefined>({
      query: (id) => `${GET_STEPS_BY_ID}${id}`,
      keepUnusedDataFor: 0
    }),
    getStepByNumber: build.query<Steps, QueryArgs>({
      query: (queryArgs: QueryArgs) => {
        if (!queryArgs.number) {
          return `${GET_STEP_BY_NUMBER}${queryArgs.idProject}/step/0`
        } else {
          return `${GET_STEP_BY_NUMBER}${queryArgs.idProject}/step/${queryArgs.number}`
        }
      }
    })
  }),
  overrideExisting: false
});
export const { useGetProjectsQuery, useGetStepsByIdQuery, useGetStepByNumberQuery } = projectsApi;
