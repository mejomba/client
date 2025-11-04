'use client'

import { useFormState } from 'react-dom'
import { verifyOtpAction } from '@/lib/actions/auth'
import { useEffect, useState } from 'react'
import api from "@/lib/axios_client";

export default function OtpVerifyFormClient({
  phone,
  next_step,
}: {
  phone: string
  next_step: 'login' | 'register'
}) {
  const [state, formAction] = useFormState(verifyOtpAction, { error: '', success: false })

  // 🕒 تایمر شمارش معکوس (مثلاً 60 ثانیه)
  const [seconds, setSeconds] = useState(120)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    if (seconds <= 0) {
      setCanResend(true)
      return
    }

    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [seconds])

  // 📩 تابع ارسال مجدد کد
  const handleResend = async () => {
    try {
      await api.post('/auth/resend-otp/', {phone})

      setSeconds(120)
      setCanResend(false)
    } catch (e) {

      console.error('خطا در ارسال مجدد کد:', e)
    }
  }

  return (
    <form
      action={formAction}
      className="max-w-sm mx-auto p-4 bg-white rounded-2xl shadow-md space-y-4"
    >
      <h2 className="text-lg font-semibold text-center">تأیید کد ارسال‌شده</h2>

      <input type="hidden" name="phone" value={phone} />
      <input type="hidden" name="next_step" value={next_step} />

      {/* پیام خطا */}
      {state.error && (
        <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-200 rounded-lg text-right">
          {state.error}
        </div>
      )}

      <input
        type="text"
        name="otp_code"
        placeholder="کد ۵ رقمی"
        className={`w-full px-3 py-2 mt-1 text-right placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
          state.error ? 'border-red-500' : 'border-gray-300'
        }`}
        required
      />

      {/* دکمه تأیید */}
      <button
        type="submit"
        className="w-full bg-green-600 text-white rounded-md py-2 font-medium hover:bg-green-700"
      >
        تأیید
      </button>

      {/* تایمر یا ارسال مجدد */}
      <div className="text-center text-sm text-gray-600 mt-2">
        {canResend ? (
          <button
            type="button"
            onClick={handleResend}
            className="text-indigo-600 font-medium hover:underline"
          >
            ارسال مجدد کد
          </button>
        ) : (
          <span dir="rtl">ارسال مجدد کد تا {seconds} ثانیه دیگر</span>
        )}
      </div>
    </form>
  )
}
