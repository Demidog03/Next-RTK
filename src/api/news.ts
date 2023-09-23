'use client'
import {api} from '@/api/api'
import {AxiosPromise, ResponseWithParams} from '@/api/types'
import {News} from '@/store/news/news.types'

export const fetchNewsApi = async (): AxiosPromise<ResponseWithParams<News[]>> => {
  return await api.get('/search')
}
