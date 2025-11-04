import Link from 'next/link'
import PasswordLoginFormClient from "@/components/forms/PasswordLoginFormClient";

export default function PasswordLoginForm2() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold text-center text-gray-800">
                    ورود به حساب کاربری
                </h1>

                {/* دکمه‌های سوئیچ */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-gray-200 rounded-lg text-center">

                    <Link
                        href="/auth/login?mode=password"
                        className="w-full px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 bg-white text-indigo-600 shadow"
                    >
                        ورود با رمز عبور
                    </Link>

                    <Link
                        href="/auth/login?mode=otp"
                        className="w-full px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 bg-transparent text-gray-600"
                    >
                        ورود با کد یکبار مصرف
                    </Link>

                </div>


                <PasswordLoginFormClient />
            </div>
        </div>
  )
}


