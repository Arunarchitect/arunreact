// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const jobApi = createApi({
  reducerPath: 'jobApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/apijob/jobs' }),
  endpoints: (builder) => ({
    saveProfile: builder.mutation({
      query: (blog) => {
        return {
          url: 'projects/',
          method: 'POST',
          body: blog
        };
      }
    }),
    getJobprofile: builder.query({
      query: () => {
        return {
          url: 'list/',
          method: 'GET',
        };
      }
    }),
    // deleteProfile: builder.mutation({
    //   query: (id) => ({
    //     url: `projects/${id}/`,
    //     method: 'DELETE',
    //   }),
    // }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetJobprofileQuery, useSaveProfileMutation} = jobApi