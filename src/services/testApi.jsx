// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const testApi = createApi({
  reducerPath: 'testApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.arunarchitect.in/apis/user' }),
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
      getLoggedUser: builder.query({
        query: (access_token) => {
          return {
            url: 'profile/',
            method: 'GET',
            headers: {
              'authorization': `Bearer ${access_token}`,
            }
          }
        }
      }),
      changeUserPassword: builder.mutation({
        query: ({ actualData, access_token }) => {
          return {
            url: 'changepassword/',
            method: 'POST',
            body: actualData,
            headers: {
              'authorization': `Bearer ${access_token}`,
            }
          }
        }
      }),
      sendPasswordResetEmail: builder.mutation({
        query: (user) => {
          return {
            url: 'send-reset-password-email/',
            method: 'POST',
            body: user,
            headers: {
              'Content-type': 'application/json',
            }
          }
        }
      }),
      resetPassword: builder.mutation({
        query: ({ actualData, id, token }) => {
          return {
            url: `/reset-password/${id}/${token}/`,
            method: 'POST',
            body: actualData,
            headers: {
              'Content-type': 'application/json',
            }
          }
        }
      }),

  }),
})



// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRegisterUserMutation, useLoginUserMutation, useGetLoggedUserQuery,useChangeUserPasswordMutation, useSendPasswordResetEmailMutation, useResetPasswordMutation} = testApi

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