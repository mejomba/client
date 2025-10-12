'use client'

import {useFormState} from 'react-dom'
import {sendOtpAction} from '@/lib/actions/auth'

export default function PhoneFormClient() {
    const [state, formAction] = useFormState(sendOtpAction, {error: '', success: false})

    return (
        <form action={formAction} className="space-y-6">
            {/* پیام خطا */}
            {state.error && (
                <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-200 rounded-lg text-right">
                    {state.error}
                </div>
            )}

            {/*/!* پیام موفقیت *!/*/}
            {/*{state.success && (*/}
            {/*  <div className="p-3 text-sm text-green-800 bg-green-100 border border-green-200 rounded-lg text-right">*/}
            {/*    کد تأیید برای شما ارسال شد.*/}
            {/*  </div>*/}
            {/*)}*/}

            {/* فیلد شماره موبایل */}
            <div>
                <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 text-right"
                >
                    شماره موبایل
                </label>
                <input
                    id="phone"
                    name="phone"
                    type="tel"
                    dir="rtl"
                    className={`w-full px-3 py-2 mt-1 text-right placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                        state.error ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                />
            </div>

            {/* دکمه ارسال */}
            <button
                type="submit"
                className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                دریافت کد
            </button>

            {/* توضیحات ایجاد حساب */}
            <div dir="rtl">
            <span>
              در صورتی که تاکنون حساب کاربری نداشته‌اید، پس از تأیید شماره
              موبایل، حساب شما به‌صورت خودکار ساخته می‌شود.
            </span>
            </div>
        </form>
    )
}
