// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const testApi = createApi({
  reducerPath: 'testApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.arunarchitect.in/api' }),
  endpoints: (builder) => ({
    getResumeprofile: builder.query({
        query: () => {
          return {
            url: 'list/',
            method: 'GET',
          };
        }
      })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetResumeprofileQuery } = testApi