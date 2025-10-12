import axios from 'axios'
import { getAccessToken } from '@/lib/api/token'
import { cookies } from 'next/headers'

const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: `${base}`,
  withCredentials: true,
})

api.interceptors.request.use(config => {
  let accessToken = getAccessToken()
  const cookieStore = cookies()
  if (!accessToken){accessToken = cookieStore.get('access')?.value}
  const csrftoken = cookieStore.get('csrftoken')
  if (csrftoken) {
    config.headers['X-CSRFToken'] = csrftoken
  }
  if (!config.headers['Content-Type'])
    config.headers['Content-Type'] = 'application/json'

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`

  return config
})

export default api
