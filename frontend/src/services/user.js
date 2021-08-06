import { backendApi } from './backend';

export const userApi = backendApi.injectEndpoints({
  // reducerPath: 'userServer',
  // baseQuery: fetchBaseQuery({
  //   baseUrl: process.env.REACT_APP_API_ADDRESS,
  // }),
  endpoints: builder => ({
    updateUser: builder.mutation({
      query: body => {
        return {
          url: '/user',
          method: 'PUT',
          body,
        };
      },
    }),
  }),
});

export const { useUpdateUserMutation } = userApi;
