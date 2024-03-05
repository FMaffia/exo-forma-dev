import {HELLO_WORLD} from "./URI";
import {rootApi} from "./rootApi";

const projectsApi = rootApi.injectEndpoints({
    endpoints: build => ({
        test: build.query({
            query: () => HELLO_WORLD,
            keepUnusedDataFor: 1,
            providesTags: []
        })
    })
})
export const {
    useTestQuery
} = projectsApi
