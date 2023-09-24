import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import {SingleNewsResponse} from '@/store/news/news.types'

export const newsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_GUARDIAN_BASE_URL,
  }),
  extractRehydrationInfo(action, {reducerPath}) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    getSingleNews: builder.query<SingleNewsResponse, {
      id: string
    }>({
      query: (arg) => {
        const {id} = arg;
        return {
          url: `search/${id}`,
          params: {
            'api-key': process.env.NEXT_PUBLIC_GUARDIAN_API_KEY,
          },
        };
      },
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useGetSingleNewsQuery
} = newsApi;

// export endpoints for use in SSR
export const { getSingleNews } = newsApi.endpoints;
