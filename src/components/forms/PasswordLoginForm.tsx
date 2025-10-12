import Link from 'next/link'
import { passwordLoginAction } from '@/lib/actions/auth'

export default function PasswordLoginForm() {
  return (
    <form
      action={passwordLoginAction}
      className="max-w-sm mx-auto p-4 bg-white rounded-2xl shadow-md space-y-4"
    >
      <h2 className="text-lg font-semibold text-center">ورود با رمز عبور</h2>

      <input
        type="text"
        name="phone"
        placeholder="شماره موبایل"
        className="w-full border border-gray-300 rounded-md p-2 text-center focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="رمز عبور"
        className="w-full border border-gray-300 rounded-md p-2 text-center focus:ring-2 focus:ring-blue-500"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700"
      >
        ورود
      </button>

      <Link
        href="/auth/login?mode=otp"
        className="block text-center text-sm text-gray-600 hover:text-blue-600"
      >
        ورود با کد تأیید (OTP)
      </Link>
    </form>
  )
}
