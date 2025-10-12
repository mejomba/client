'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'


export default function LogoutPage() {
    const router = useRouter()

    useEffect(() => {
        // پاک کردن توکن‌ها
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')

        // هدایت به صفحه ورود یا خانه
        router.push('/')
    }, [router])

    return (
        <div className="text-center mt-10">
          <h5 className="text-xl font-bold">
            در حال خروج...
          </h5>
        </div>

    )
}