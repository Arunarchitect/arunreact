// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const testApi = createApi({
  reducerPath: 'testApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/apis/user/' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
        query: (user) => {
          return {
            url: 'register/',
            method: 'POST',
            body: user,
            headers: {
              'Content-type':'application/json',
            }
          };
        }
      }),
      loginUser: builder.mutation({
        query: (user) => {
          return {
            url: 'login/',
            method: 'POST',
            body: user,
            headers: {
              'Content-type':'application/json',
            }
          };
        }
      }),

  }),
})



// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRegisterUserMutation, useLoginUserMutation } = testApi

export const testApi1 = createApi({
  reducerPath: 'testApi1',
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
export const { useGetResumeprofileQuery } = testApi1