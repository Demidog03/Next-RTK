'use client'
import {CaseReducer, createSlice, PayloadAction, SliceCaseReducers} from '@reduxjs/toolkit'
import {RootState} from '@/store'
import {News, NewsState} from '@/store/news/news.types'
import {fetchNews} from '@/store/news/news.thunk'
import {createAction} from '@reduxjs/toolkit'

const initialState: NewsState = {
  news: []
}

interface Reducers<State> extends SliceCaseReducers<State> {
  setNews: CaseReducer<State, PayloadAction<News[]>>
}

const newsSlice = createSlice<NewsState, Reducers<NewsState>>({
  name: 'post',
  initialState,
  reducers: {
    setNews: (state, action) => {
      state.news = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchNews.fulfilled, (state, action) => {
          state.news = action.payload.response.results;
        })
  },
})

export const {
  setNews
} = newsSlice.actions

export const newsSelector = (state: RootState): News[] => state.news.news

export default newsSlice.reducer
