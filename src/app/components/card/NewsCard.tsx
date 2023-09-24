import {FC} from 'react'
import cl from './NewsCard.module.css'
import {AiOutlineArrowRight} from 'react-icons/ai'
import Link from 'next/link'

interface NewsCadProps {
  imgSrc?: string
  title: string
  id: string
}

const NewsCard: FC<NewsCadProps> = ({id, imgSrc, title}) => {
  return (
      <div className={cl.card}>
        <img src={imgSrc || 'https://craftsnippets.com/articles_images/placeholder/placeholder.jpg'} alt='kitten' />
        <div className={cl.content}>
          <h2 className={cl.title}>{title}</h2>
          <Link href={`news/${id.replace(/\//g, "=")}`} className={cl.detailsBtn}>
            <span>Details</span> <AiOutlineArrowRight />
          </Link>
        </div>
      </div>
  )
}

export default NewsCard
