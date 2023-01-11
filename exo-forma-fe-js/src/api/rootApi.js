import { ROOT_API } from './URI'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { keyCloak } from '../constants/Constants'

export const rootApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: ROOT_API,
        prepareHeaders: headers => {
            const token = keyCloak.token
            headers.set('Authorization', `Bearer ${token}`)
            return headers
        }
    }),
    tagTypes: ['User', 'Detail', 'Projects', 'Steps'],
    endpoints: () => ({})
})
