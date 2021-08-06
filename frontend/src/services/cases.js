import { backendApi } from './backend';

export const casesApi = backendApi.injectEndpoints({
  // reducerPath: 'casesServer',
  // baseQuery: fetchBaseQuery({
  //   baseUrl: process.env.REACT_APP_API_ADDRESS
  // }),
  endpoints: builder => ({
    getCases: builder.query({
      query: token => {
        return {
          url: 'cases',
          method: 'GET',
        };
      },
    }),
    addCase: builder.mutation({
      query: body => {
        return {
          url: 'cases',
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const { useGetCasesQuery, useAddCaseMutation } = casesApi;
