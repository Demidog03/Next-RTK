import {SingleNewsResponse} from '@/store/news/news.types'
import cl from './singleNews.module.css'
import Link from 'next/link'

async function getSingleNewsData({id}: {id: string}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_GUARDIAN_BASE_URL}/${id}?` + new URLSearchParams(
      {
        'api-key': process.env.NEXT_PUBLIC_GUARDIAN_API_KEY || '',
        'show-fields': 'thumbnail,bodyText',
      }
  ), {
    method: 'GET'
  })
  const data: SingleNewsResponse = await response.json()
  return data.response.content
}

export default async function Page({params}: { params: { id: string } }) {
  const id = params.id.replace(/%3D/g, "/")
  const singleData = await getSingleNewsData({id})
  return (
      <div className={cl.singleNews}>
        <div className={cl.container}>
          <Link className={cl.backBtn} href={'/'}>Back</Link>
          <h1 className={cl.title}>{singleData.webTitle}</h1>
          <p>{new Date(singleData.webPublicationDate).toDateString()}</p>
          <div className={cl.content}>
            <img src={singleData.fields?.thumbnail || ''} alt=""/>
            <div className={cl.right}>
              <p className={cl.body}>{singleData.fields.bodyText.slice(0, 1000)}...</p>
              <a href={singleData.webUrl} className={cl.readMoreBtn}>Read more</a>
            </div>
          </div>
        </div>
      </div>
  )
}
