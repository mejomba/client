// app/api/login/route.ts
import { cookies } from 'next/headers'
import api from "@/lib/axios";

export async function Login(endpoint, phoneNumber, otp) {
  const response = await api.post(endpoint, {
      phone:phoneNumber,
      code:otp,
  })

  const { access, refresh, user } = response.data

  const cookieStore = cookies()
  cookieStore.set({
    name: 'access_token',
    value: access,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    path: '/',
  })

  cookieStore.set({
    name: 'refresh_token',
    value: refresh,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    path: '/',
  })

  return new Response(JSON.stringify({ success: true }), { status: 200 })
}
