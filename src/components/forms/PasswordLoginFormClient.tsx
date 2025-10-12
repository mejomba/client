'use client'

import Link from "next/link";
import {useFormState} from 'react-dom'
import {passwordLoginAction} from '@/lib/actions/auth'

export default function PasswordLoginFormClient() {
    const [state, formAction] = useFormState(passwordLoginAction, {error: '', success: false})

    return (
        <form action={formAction} className="space-y-6">
            {/* پیام خطا */}
            {state.error && (
                <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-200 rounded-lg text-right">
                    {state.error}
                </div>
            )}
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
                    className="w-full px-3 py-2 mt-1 text-right placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                />
            </div>

            {/* فیلد رمز عبور */}
            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 text-right"
                >
                    رمز عبور
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    className="w-full px-3 py-2 mt-1 text-right placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="••••••••"
                />
                {/*<p className="mt-1 text-sm text-red-600 text-right" dir="rtl">*/}
                {/*    حداقل ۸ کاراکتر*/}
                {/*</p>*/}
            </div>

            {/* دکمه ورود */}
            <button
                type="submit"
                className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                ورود
            </button>

            {/* حساب کاربری ندارید */}
            <div dir="rtl" className="text-right">
                <span>حساب کاربری ندارید؟</span>
                <Link
                    href="/auth/login?mode=otp"
                    className="m-3 cursor-pointer text-green-600 hover:underline"
                >
                    ایجاد حساب کاربری
                </Link>
            </div>
        </form>
    )
}
