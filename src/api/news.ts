import {api} from '@/api/api'
import {AxiosPromise, ResponseWithParams} from '@/api/types'
import {News, SingleNewsResponse} from '@/store/news/news.types'

export const fetchNewsApi = async (): AxiosPromise<ResponseWithParams<News[]>> => {
  return await api.get('/search')
}

export const fetchSingleNewsApi = async (id: string): AxiosPromise<SingleNewsResponse> => {
  return await api.get(`/search/${id}`)
}

export const fetchNewsByPageApi = async (page: number): AxiosPromise<ResponseWithParams<News[]>> => {
  return await api.get('/search', {
    params: {
      page
    }
  })
}

export const fetchNewsByParamsApi = async (params: Record<string, any>[]): AxiosPromise<ResponseWithParams<News[]>> => {
  const paramsObject = params.reduce((acc, obj) => {
    Object.keys(obj).forEach((key) => {
      acc[key] = obj[key];
    });
    return acc;
  }, {});

  return await api.get('/search', {
    params: paramsObject
  });
}

