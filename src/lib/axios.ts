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
  // let refreshToken = cookieStore.get('refresh')
  if (!accessToken){accessToken = cookieStore.get('access')?.value ?? null}
  const csrftoken = cookieStore.get('csrftoken')
  if (csrftoken) {
    config.headers['X-CSRFToken'] = csrftoken
  }
  if (!config.headers['Content-Type'])
    config.headers['Content-Type'] = 'application/json'

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
  // if (refreshToken) config.headers.Authorization = `Bearer ${refreshToken}`

  return config
})

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log('before try for refresh token...')
        // 👇 درخواست رفرش (HttpOnly کوکی به صورت خودکار ارسال میشه)
        const data = await axios.post(`${base}/auth/token/refresh/`, {'refresh': cookies().get('refresh')?.value}, { withCredentials: true });
        console.log(data)
        if (data.data.access) {
          const cookieStore = cookies()
          cookieStore.set('access', data.data.access, { httpOnly: false })
        }
        console.log('try for refresh token...')

        processQueue(null);
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        console.error("❌ Refresh token failed, logging out");
        // window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;

