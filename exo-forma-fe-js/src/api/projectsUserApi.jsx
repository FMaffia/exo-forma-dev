import {rootApi} from "./rootApi";
import {UPDATE_LAST_STEP} from "./URI";

const projectsUserApi = rootApi.injectEndpoints({
    endpoints: build => ({
        updateLastStep: build.mutation({
            query: (rq) => ({
                url: UPDATE_LAST_STEP,
                method: "POST",
                body: rq
            }),
            invalidatesTags: ['Steps', 'Detail']
        })
    }),
    overrideExisting: false
});
export const {useUpdateLastStepMutation} = projectsUserApi;
