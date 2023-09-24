'use client'
import {CaseReducer, createSlice, PayloadAction, SliceCaseReducers} from '@reduxjs/toolkit'
import {RootState} from '@/store'
import {News, NewsState} from '@/store/news/news.types'
import {
  fetchNews,
  fetchNewsByPage,
  fetchNewsByParams,
} from '@/store/news/news.thunk'

const initialState: NewsState = {
  news: [],
  pending: false
}

interface Reducers<State> extends SliceCaseReducers<State> {
  setNews: CaseReducer<State, PayloadAction<News[]>>
  addNews: CaseReducer<State, PayloadAction<News[]>>
}

const newsSlice = createSlice<NewsState, Reducers<NewsState>>({
  name: 'post',
  initialState,
  reducers: {
    setNews: (state, action) => {
      state.news = action.payload
    },
    addNews: (state, action) => {
      state.news = [...state.news, ...action.payload]
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchNews.pending || fetchNewsByParams.pending || fetchNewsByPage.pending, (state, action) => {
          state.pending = true
        })
        .addCase(fetchNews.fulfilled || fetchNewsByParams.fulfilled, (state, action) => {
          state.news = action.payload.response.results
          state.pending = false
        })
        .addCase(fetchNewsByPage.fulfilled, (state, action) => {
          state.news = [...state.news, ...action.payload.response.results]
          state.pending = false
        })
  },
})

export const {
  setNews,
  addNews
} = newsSlice.actions

export const newsSelector = (state: RootState): News[] => state.news.news
export const newsPendingSelector = (state: RootState): boolean => state.news.pending

export default newsSlice.reducer
