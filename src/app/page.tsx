'use client'
import cl from './page.module.css'
import {useEffectOnce, useUpdateEffect} from 'usehooks-ts'
import {newsPendingSelector, newsSelector} from '@/store/news/news.slice'
import {useAppDispatch, useSelector} from '@/store'
import {
  fetchNews,
  fetchNewsByPage,
  fetchNewsByParams,
} from '@/store/news/news.thunk'
import NewsCardWrapper from '@/app/components/card-wrapper/NewsCardWrapper'
import NewsCard from '@/app/components/card/NewsCard'
import {FadeLoader} from 'react-spinners'
import {ChangeEvent, useState} from 'react'
import {useDebounce} from '@/hooks/useDebounce'
import Select from 'react-select'

export default function Home() {
  const orderVariants = [
    { label: 'Newest', value: 'newest' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'Relevance', value: 'relevance' }
  ];
  const sizeVariants = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '20', value: 20 },
    { label: '25', value: 25 },
    { label: '30', value: 30 }
  ];
  let page = 2
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedOrderVariants, setSelectedOrderVariants] = useState()
  const [selectedSize, setSelectedSize] = useState()
  const dispatch = useAppDispatch()
  const news = useSelector(newsSelector)
  const newsPending = useSelector(newsPendingSelector)
  const debouncedSearchQueries = useDebounce(searchQuery)

  useEffectOnce(() => {
    dispatch(fetchNews())
    window.addEventListener('scroll', handleScroll)
  })
  useUpdateEffect(() => {
    console.log(news)
  })
  useUpdateEffect(() => {
    dispatch(fetchNewsByParams([
      {'order-by': selectedOrderVariants || 'newest'},
      {'page-size': selectedSize || 10},
      {q: debouncedSearchQueries || ''}
    ]))
  }, [selectedSize, debouncedSearchQueries, selectedOrderVariants])

  function handleScroll(e: Event) {
    if (e.target instanceof Document) {
      if((window.innerHeight + Math.round(e.target.documentElement.scrollTop) === e.target.documentElement.scrollHeight) && !newsPending){
        dispatch(fetchNewsByPage({page}))
        page++
      }
    }
  }
  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value)
  }
  function handleOrderChange(newValue: any) {
    setSelectedOrderVariants(newValue.value)
  }
  function handleSizeChange(newValue: any) {
    setSelectedSize(newValue.value)
  }

  return (
      <div className={cl.container}>
        <input type="search" className={cl.searchInput} onChange={handleSearch} placeholder="Search news"/>
        <div className={cl.selects}>
          <Select
              id="order-select"
              options={orderVariants}
              onChange={handleOrderChange}
              value={orderVariants.find(option => option.value === selectedOrderVariants)}
              placeholder="Sort by"
          />
          <Select
              id="size-select"
              options={sizeVariants}
              onChange={handleSizeChange}
              value={sizeVariants.find(option => option.value === selectedSize)}
              placeholder="Items on page"
          />
        </div>
        <NewsCardWrapper>
          {news.map((el, index) => (
              <NewsCard key={index} id={el.id} imgSrc={el?.fields?.thumbnail} title={el.webTitle}/>
          ))}
        </NewsCardWrapper>
        <FadeLoader
            color="#483520"
            loading={newsPending}
            cssOverride={{
              margin: '20px auto'
            }}
        />
      </div>
  )
}
