import axios from 'axios'
import { getAccessToken } from '@/lib/api/token'

const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: `${base}`,
  withCredentials: true,
})

api.interceptors.request.use(config => {
  const accessToken = getAccessToken()
  // const csrftoken = cookieStore.get('csrftoken')
  // if (csrftoken) {
  //   config.headers['X-CSRFToken'] = csrftoken
  // }
  if (!config.headers['Content-Type'])
    config.headers['Content-Type'] = 'application/json'

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`

  return config
})

export default api
