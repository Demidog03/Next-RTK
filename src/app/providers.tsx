'use client'
import {Provider} from 'react-redux'
import store from '@/store'
import {ReactNode} from 'react'
import {Toaster} from 'react-hot-toast'

export function Providers({children}: {children: ReactNode}) {
  return (
      <Provider store={store}>
        <Toaster />
        {children}
      </Provider>
  )
}
