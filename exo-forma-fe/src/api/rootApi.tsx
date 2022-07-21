import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ROOT_API } from './apiConstants'

// initialize an empty api service that we'll inject endpoints into later as needed
export const rootApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: ROOT_API }),
    endpoints: () => ({})
})
