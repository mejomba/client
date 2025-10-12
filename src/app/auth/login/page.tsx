import PhoneForm2 from '@/components/forms/PhoneForm2'
import OtpVerifyForm2 from '@/components/forms/OtpVerifyForm2'
import PasswordLoginForm2 from '@/components/forms/PasswordLoginForm2'
import { cookies } from 'next/headers'
import {redirect} from "next/navigation";
import Link from "next/link";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { phone?: string; step?: string; mode?: string }
}) {
  const { phone, step, mode } = searchParams

  const token = cookies().get('access')
  console.log('token from cookie: ', token)
  if (token) {
    redirect('/profile/')
  }

  const currentMode = mode === 'password' ? 'password' : 'otp'

  return (
      <>
      {!phone && currentMode === 'otp' ? (
        <PhoneForm2 />
      ) : !phone && currentMode === 'password' ? (
        <PasswordLoginForm2 />
      ) : (
        <OtpVerifyForm2 phone={phone!} next_step={(step as 'login' | 'register') || 'login'} />
      )}
        </>





    // <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
    //   <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
    //     <h1 className="text-2xl font-bold text-center text-gray-800">
    //       ورود به حساب کاربری
    //     </h1>
    //
    //     {/* دکمه‌های سوئیچ */}
    //     <div className="grid grid-cols-2 gap-2 p-1 bg-gray-200 rounded-lg">
    //
    //
    //       <Link
    //     href="/auth/login?mode=password"
    //     className="w-full px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 bg-white text-indigo-600 shadow"
    //   >
    //     ورود با رمز عبور
    //   </Link>
    //
    //       <Link
    //     href="/auth/login?mode=otp"
    //     className="w-full px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 bg-transparent text-gray-600"
    //   >
    //     ورود با کد یکبار مصرف
    //   </Link>
    //
    //     </div>
    //
    //     {/* پیام خطا */}
    //     <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-200 rounded-lg text-right">
    //       شماره موبایل معتبر نیست.
    //     </div>
    //
    //     <form className="space-y-6">
    //       {/* فیلد شماره موبایل */}
    //       <div>
    //         <label
    //           htmlFor="phone"
    //           className="block text-sm font-medium text-gray-700 text-right"
    //         >
    //           شماره موبایل
    //         </label>
    //         <input
    //           id="phone"
    //           name="phone"
    //           type="tel"
    //           className="w-full px-3 py-2 mt-1 text-right placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    //           placeholder="۰۹۱۲۳۴۵۶۷۸۹"
    //         />
    //         <p className="mt-1 text-sm text-red-600 text-right" dir="rtl">
    //           شماره وارد شده معتبر نیست.
    //         </p>
    //       </div>
    //
    //       {/* فیلد رمز عبور */}
    //       <div>
    //         <label
    //           htmlFor="password"
    //           className="block text-sm font-medium text-gray-700 text-right"
    //         >
    //           رمز عبور
    //         </label>
    //         <input
    //           id="password"
    //           name="password"
    //           type="password"
    //           className="w-full px-3 py-2 mt-1 text-right placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    //           placeholder="••••••••"
    //         />
    //         <p className="mt-1 text-sm text-red-600 text-right" dir="rtl">
    //           حداقل ۸ کاراکتر
    //         </p>
    //       </div>
    //
    //       {/* دکمه ورود */}
    //       <button
    //         type="submit"
    //         className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //       >
    //         ورود
    //       </button>
    //
    //       {/* تایمر یا ارسال مجدد */}
    //       <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
    //         <span>ارسال مجدد کد تا 0:45</span>
    //       </div>
    //
    //       {/* حساب کاربری ندارید */}
    //       <div dir="rtl">
    //         <span>حساب کاربری ندارید؟</span>
    //         <span className="m-3 cursor-pointer text-green-600">
    //           ایجاد حساب کاربری
    //         </span>
    //       </div>
    //
    //       {/* توضیحات ایجاد حساب */}
    //       <div dir="rtl">
    //         <span>
    //           در صورتی که تاکنون حساب کاربری نداشته‌اید، پس از تأیید شماره
    //           موبایل، حساب شما به‌صورت خودکار ساخته می‌شود.
    //         </span>
    //       </div>
    //     </form>
    //   </div>
    // </div>
  )
}

