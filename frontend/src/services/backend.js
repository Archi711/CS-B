import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const backendApi = createApi({
  reducerPath: 'backend',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_ADDRESS,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.accessToken;
      if (token) {
        headers.set('token', token);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    userLogin: builder.mutation({
      query: body => {
        return {
          url: 'login',
          method: 'POST',
          body,
        };
      },
    }),
    userRelogin: builder.mutation({
      query: body => {
        return {
          url: 'relogin',
          method: 'POST',
          body,
        };
      },
    }),
    tokenRefresh: builder.mutation({
      query: body => {
        return {
          url: 'token',
          method: 'POST',
          body,
        };
      },
    }),
    userLogout: builder.mutation({
      query: body => {
        return {
          url: 'logout',
          method: 'POST',
          body,
        };
      },
    }),
  }),
});
export const {
  useUserLoginMutation,
  useUserReloginMutation,
  useUserLogoutMutation,
} = backendApi;
