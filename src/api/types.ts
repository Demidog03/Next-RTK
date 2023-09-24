import {AxiosResponse} from 'axios'

export type AxiosPromise<T> = Promise<AxiosResponse<T>>
export type AxiosResponseType<T extends AxiosResponse<unknown>> = T extends Promise<infer U> ? U : never

export interface ResponseWithParams<T> {
  response: {
    status: string
    userTier: string
    total: number
    startIndex: number
    pageSize: number
    currentPage: number
    pages: number
    orderBy: string
    results: T
  }
}

