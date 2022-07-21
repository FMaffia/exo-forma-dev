import { rootApi } from "./rootApi";
import { User } from "../types/models";
import { CHECK_USER_API } from "./apiConstants";

const userApi = rootApi.injectEndpoints({
  endpoints: build => ({
    checkUser: build.mutation<User, User>({
      query: (user: User) => ({
        url: CHECK_USER_API,
        method: "POST",
        body: user
      })
    })
  }),
  overrideExisting: false
});
export const { useCheckUserMutation } = userApi;
