import {rootApi} from "./rootApi";
import {GET_PROJECT_BY_PATH, GET_PROJECTS_API, GET_STEP_BY_NUMBER, GET_STEPS_BY_ID} from "./URI";

const projectsApi = rootApi.injectEndpoints({
    endpoints: build => ({
        getProjects: build.query({
                query: () => GET_PROJECTS_API,
                keepUnusedDataFor: 1
            }
        ),
        getDetails: build.query({
                query: (path) => GET_PROJECT_BY_PATH + path,
                keepUnusedDataFor: 1,
                providesTags: ['Detail'],
            }
        ),
        getStepsById: build.query({
            query: (id) => `${GET_STEPS_BY_ID}${id}`,
            providesTags: ['Steps'],
            keepUnusedDataFor: 1
        }),

        getStepByNumber: build.query({
            query: (queryArgs) => {
                if (!queryArgs.number) {
                    return `${GET_STEP_BY_NUMBER}${queryArgs?.idProject}/step/0`;
                } else {
                    return `${GET_STEP_BY_NUMBER}${queryArgs?.idProject}/step/${queryArgs.number}`;
                }
            },
            keepUnusedDataFor: 1
        })
    }),
    overrideExisting: false
});
export const {useGetProjectsQuery, useGetDetailsQuery, useGetStepsByIdQuery, useGetStepByNumberQuery} = projectsApi;
