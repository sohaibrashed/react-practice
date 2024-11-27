import { USERS_URL } from "@/constants";
import { apiSlice } from "./apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),
    signin: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/signin`,
        method: "POST",
        body: data,
      }),
    }),
    signout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/signout`,
        method: "POST",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSignupMutation, useSigninMutation, useSignoutMutation } =
  usersApi;
