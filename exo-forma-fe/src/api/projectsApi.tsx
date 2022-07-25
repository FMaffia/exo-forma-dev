import { rootApi } from "./rootApi";
import { Project, Steps } from "../types/models";
import { GET_PROJECT_BY_PATH, GET_PROJECTS_API, GET_STEP_BY_NUMBER, GET_STEPS_BY_ID } from "./apiConstants";

type QueryArgs = {
  idProject: string | undefined
  number: number | undefined
}
const projectsApi = rootApi.injectEndpoints({

  endpoints: build => ({
    getProjects: build.query<Project[], void | string>({
        query: (id) => GET_PROJECTS_API,
        keepUnusedDataFor: 1
      }
    ),
    getDetails: build.query<Project, string>({
        query: (path) => GET_PROJECT_BY_PATH + path,
        keepUnusedDataFor: 1
      }
    ),
    getStepsById: build.query<Steps[], string | undefined>({
      query: (id) => `${GET_STEPS_BY_ID}${id}`,
      keepUnusedDataFor: 0
    }),
    getStepByNumber: build.query<Steps, QueryArgs>({
      query: (queryArgs: QueryArgs) => {
        if (!queryArgs.number) {
          return `${GET_STEP_BY_NUMBER}${queryArgs.idProject}/step/0`;
        } else {
          return `${GET_STEP_BY_NUMBER}${queryArgs.idProject}/step/${queryArgs.number}`;
        }
      }
    })
  }),
  overrideExisting: false
});
export const { useGetProjectsQuery, useGetDetailsQuery, useGetStepsByIdQuery, useGetStepByNumberQuery } = projectsApi;
