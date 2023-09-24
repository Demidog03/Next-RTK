'use client'

export interface NewsState {
  news: News[]
  pending: boolean
}

export interface News {
  id: string
  type: string
  sectionId: string
  sectionName: string
  webPublicationDate: string
  webTitle: string
  webUrl: string
  apiUrl: string
  isHosted: boolean,
  pillarId: string
  pillarName: string,
  fields: {
    thumbnail: string
    bodyText: string
  }
  blocks: any
}

export interface SingleNewsResponse {
  response: {
    "status": string
    "userTier": string
    "total": number
    "content": News
  }
}
