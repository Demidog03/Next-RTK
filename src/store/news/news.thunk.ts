'use client'
import {fetchNewsApi} from '@/api/news'
import {createAsyncThunk} from '@reduxjs/toolkit'

export const fetchNews = createAsyncThunk('news/fetchNews', async (_, { dispatch }) => {
    try {
        const response = await fetchNewsApi();
        return response.data;
    } catch (error) {
        throw error;
    }
});

