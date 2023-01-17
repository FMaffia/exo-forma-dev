import { rootApi } from './rootApi'
import {
    GET_PROJECT_API,
    GET_PROJECT_BY_PATH_API,
    GET_PROJECTS_API,
    GET_STEPS_BY_ID_API,
    IMAGE_API,
    UPDATE_PROJECT_API,
    UPDATE_STEP_API,
    UPLOAD_IMAGE_API
} from './URI'
import { store } from '../store/store'
import { setBackupProject } from '../slices/backupProjectSlice'
import { setSelectedProject } from '../slices/projectSlice'

const projectsApi = rootApi.injectEndpoints({
    endpoints: build => ({
        getProjects: build.query({
            query: () => GET_PROJECTS_API,
            keepUnusedDataFor: 1,
            providesTags: ['all']
        }),
        update: build.mutation({
            query: project => ({
                url: UPDATE_PROJECT_API,
                method: 'POST',
                body: project
            }),
            invalidatesTags: ['all'],
            transformResponse: responseData => {
                store.dispatch(setBackupProject(responseData))
                return responseData
            }
        }),
        updateStep: build.mutation({
            query: step => ({
                url: UPDATE_STEP_API,
                method: 'POST',
                body: step
            }),
            invalidatesTags: ['editProject']
        }),
        getProjectById: build.query({
            query: project => ({
                url: GET_PROJECT_API,
                method: 'POST',
                body: project
            }),
            transformResponse: responseData => {
                store.dispatch(setSelectedProject(responseData))
                store.dispatch(setBackupProject(responseData))
                return responseData
            },
            keepUnusedDataFor: 10000,
            providesTags: ['editProject']
        }),
        uploadImage: build.mutation({
            query: request => ({
                url: UPLOAD_IMAGE_API,
                method: 'POST',
                credentials: 'include',
                body: request
            })
        }),
        getImage: build.query({
            query: path => ({
                url: IMAGE_API + path,
                method: 'GET',
                responseHandler: 'text'
            })
        }),
        getDetails: build.query({
            query: path => GET_PROJECT_BY_PATH_API + path,
            keepUnusedDataFor: 1,
            providesTags: ['Detail']
        }),
        getStepsById: build.query({
            query: id => `${GET_STEPS_BY_ID_API}${id}`,
            providesTags: ['Steps'],
            keepUnusedDataFor: 1
        }),
        getStepByNumber: build.query({
            query: queryArgs => {
                if (!queryArgs.number) {
                    return `${GET_STEPS_BY_ID_API}${queryArgs?.idProject}/step/0`
                } else {
                    return `${GET_STEPS_BY_ID_API}${queryArgs?.idProject}/step/${queryArgs.number}`
                }
            },
            keepUnusedDataFor: 1
        })
    }),
    overrideExisting: false
})
export const {
    useGetProjectsQuery,
    useGetDetailsQuery,
    useGetImageQuery,
    useGetStepsByIdQuery,
    useGetStepByNumberQuery,
    useGetProjectByIdQuery,
    useUpdateMutation,
    useUpdateStepMutation,
    useUploadImageMutation
} = projectsApi
