import cl from './NewsCardWrapper.module.css'
import {ReactNode} from 'react'

const NewsCardWrapper = ({children}: {children: ReactNode}) => {
  return (
      <div className={cl.wrapper}>
        {children}
      </div>
  )
}

export default NewsCardWrapper
