'use client'

import {configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector as useReduxSelector} from 'react-redux'
import newsReducer from './news/news.slice'
import thunk from 'redux-thunk'

const store = configureStore({
  reducer: {
    news: newsReducer
  },
  devTools: true,
  middleware: getDefaultMiddleware => getDefaultMiddleware()
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector

export default store
