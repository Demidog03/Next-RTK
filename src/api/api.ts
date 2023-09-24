import axios from 'axios'
import toast from 'react-hot-toast'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GUARDIAN_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  params: {
    'api-key': process.env.NEXT_PUBLIC_GUARDIAN_API_KEY,
    'show-fields': 'thumbnail'
  }
})

// api.interceptors.response.use(undefined, async (error) => {
//   if (axios.isAxiosError(error) && error) {
//     toast.error(error.message)
//   }
//   return await Promise.reject(error)
// })
