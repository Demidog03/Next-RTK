'use client'
import {
    fetchNewsApi, fetchNewsByPageApi,
    fetchNewsByParamsApi,
} from '@/api/news'
import {createAsyncThunk} from '@reduxjs/toolkit'

export const fetchNews = createAsyncThunk('news/fetchNews', async (_, { dispatch }) => {
    try {
        const response = await fetchNewsApi();
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const fetchNewsByParams = createAsyncThunk('news/fetchNews', async (params: Record<string, any>[], { dispatch }) => {
    try {
        const response = await fetchNewsByParamsApi([...params]);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const fetchNewsByPage = createAsyncThunk('news/fetchNewsByPage', async ({page}: {page: number}, { dispatch }) => {
    try {
        const response = await fetchNewsByPageApi(page);
        return response.data;
    } catch (error) {
        throw error;
    }
});

// export const fetchNewsBySearchQueries = createAsyncThunk('news/fetchNewsBySearchQueries', async ({query}: {query: string}, { dispatch }) => {
//     try {
//         const response = await fetchNewsBySearchQueryApi(query);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// });
//
// export const fetchNewsByOrder = createAsyncThunk('news/fetchNewsByOrder', async ({query}: {query: string}, { dispatch }) => {
//     try {
//         const response = await fetchNewsByOrderApi(query);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// });
//
// export const fetchNewsByPageSize = createAsyncThunk('news/fetchNewsByPageSize', async ({size}: {size: number}, { dispatch }) => {
//     try {
//         const response = await fetchNewsByPageSizeApi(size);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// });


