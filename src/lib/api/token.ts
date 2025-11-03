

export function saveTokens(access: string) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', access)
    }
}

export function getAccessToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('access_token')
}

export function clearAccessToken() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token')
    }
}

