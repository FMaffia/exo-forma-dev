import { rootApi } from "./rootApi";
import { Project, Steps } from "../types/models";
import { GET_PROJECTS_API, GET_STEPS_BY_ID } from "./apiConstants";

const projectsApi = rootApi.injectEndpoints({
  endpoints: build => ({
    getProjects: build.query<Project[], null>({
      query: () => GET_PROJECTS_API
    }),
    getStepsById: build.query<Steps[], string | undefined>({
      query: (id) => `${GET_STEPS_BY_ID}${id}`,
      keepUnusedDataFor: 5
    })
  }),
  overrideExisting: false
});
export const { useGetProjectsQuery, useGetStepsByIdQuery } = projectsApi;
