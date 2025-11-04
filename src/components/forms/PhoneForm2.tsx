import Link from 'next/link'
import PhoneFormClient from "@/components/forms/PhoneFormClient";

export default function PhoneForm2() {
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
                        className="w-full px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 bg-transparent text-gray-600"
                    >
                        ورود با رمز عبور
                    </Link>

                    <Link
                        href="/auth/login?mode=otp"

                        className="w-full px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 bg-white text-indigo-600 shadow"
                    >
                        ورود با کد یکبار مصرف
                    </Link>
                </div>

                {/* پیام خطا */}
                {/*<div className="p-3 text-sm text-red-800 bg-red-100 border border-red-200 rounded-lg text-right">*/}
                {/*    شماره موبایل معتبر نیست.*/}
                {/*</div>*/}

                <PhoneFormClient />
            {/*    <form action={sendOtpAction} className="space-y-6">*/}
            {/*        /!* فیلد شماره موبایل *!/*/}
            {/*        <div>*/}
            {/*            <label*/}
            {/*                htmlFor="phone"*/}
            {/*                className="block text-sm font-medium text-gray-700 text-right"*/}
            {/*            >*/}
            {/*                شماره موبایل*/}
            {/*            </label>*/}
            {/*            <input*/}
            {/*                id="phone"*/}
            {/*                name="phone"*/}
            {/*                type="tel"*/}
            {/*                className="w-full px-3 py-2 mt-1 text-right placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"*/}
            {/*                placeholder="۰۹۱۲۳۴۵۶۷۸۹"*/}
            {/*            />*/}
            {/*            /!*<p className="mt-1 text-sm text-red-600 text-right" dir="rtl">*!/*/}
            {/*            /!*    شماره وارد شده معتبر نیست.*!/*/}
            {/*            /!*</p>*!/*/}
            {/*        </div>*/}

            {/*        /!* دکمه ورود *!/*/}
            {/*        <button*/}
            {/*            type="submit"*/}
            {/*            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"*/}
            {/*        >*/}
            {/*            دریافت کد*/}
            {/*        </button>*/}

            {/*        /!* تایمر یا ارسال مجدد *!/*/}
            {/*        /!*<CountDownTimer startSeconds={90}/>*!/*/}


            {/*        /!* توضیحات ایجاد حساب *!/*/}
            {/*        <div dir="rtl">*/}
            {/*<span>*/}
            {/*  در صورتی که تاکنون حساب کاربری نداشته‌اید، پس از تأیید شماره*/}
            {/*  موبایل، حساب شما به‌صورت خودکار ساخته می‌شود.*/}
            {/*</span>*/}
            {/*        </div>*/}
            {/*    </form>*/}
            </div>
        </div>
    )
}


