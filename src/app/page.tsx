'use client'
import cl from './page.module.css'
import {useEffectOnce, useUpdateEffect} from 'usehooks-ts'
import {newsSelector} from '@/store/news/news.slice'
import {useAppDispatch, useSelector} from '@/store'
import {fetchNews} from '@/store/news/news.thunk'

export default function Home() {
  const dispatch = useAppDispatch()
  const news = useSelector(newsSelector)

  useEffectOnce(() => {
    dispatch(fetchNews())
  })

  useUpdateEffect(() => {
    console.log(news)
  })

  return (
      <div></div>
  )
}
