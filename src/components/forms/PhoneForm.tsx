import Link from 'next/link'
import { sendOtpAction } from '@/lib/actions/auth'

export default function PhoneForm() {
  return (
    <form
      action={sendOtpAction}
      className="max-w-sm mx-auto p-4 bg-white rounded-2xl shadow-md space-y-4"
    >
      <h2 className="text-lg font-semibold text-center">ورود یا ثبت‌نام با شماره موبایل</h2>

      <input
        type="text"
        name="phone"
        placeholder="شماره موبایل"
        className="w-full border border-gray-300 rounded-md p-2 text-center focus:ring-2 focus:ring-blue-500"
        required
      />

      {/*<select*/}
      {/*  name="next_step"*/}
      {/*  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"*/}
      {/*  required*/}
      {/*>*/}
      {/*  <option value="login">ورود</option>*/}
      {/*  <option value="register">ثبت‌نام</option>*/}
      {/*</select>*/}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700"
      >
        دریافت کد
      </button>

      <Link
        href="/auth/login?mode=password"
        className="block text-center text-sm text-gray-600 hover:text-blue-600"
      >
        ورود با رمز عبور
      </Link>
    </form>
  )
}
