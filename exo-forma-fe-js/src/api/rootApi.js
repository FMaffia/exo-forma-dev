import {ROOT_API} from "./URI";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const rootApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl: ROOT_API}),
    tagTypes: ['User', 'Detail', 'Projects', 'Steps'],
    endpoints: () => ({})
})