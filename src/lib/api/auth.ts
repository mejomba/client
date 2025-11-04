// lib/api/auth.ts
import api from '@/lib/axios'

interface Tokens {
    access: string
    refresh: string
}

export async function sendOtp(phone: string) {
    const response = await api.post('/auth/otp/send/', { phone })
    return response.data
}

export async function phoneCheck(phone: string, method: string) {
    const response = await api.post('auth/phone-check/', { phone, method })
    return response.data
}

export async function passwordLoginOrSignup(phone: string, password: string) {
    const response = await api.post('/auth/password-login-or-signup/', { phone, password })
    return response.data
}

export function saveTokens({ access, refresh }: Tokens) {
    if (typeof window === 'undefined') return
    localStorage.setItem('access', access)
    localStorage.setItem('refresh', refresh)
}

