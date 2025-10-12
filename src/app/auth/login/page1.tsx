"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter, useSearchParams } from 'next/navigation'
import {passwordLoginOrSignup, phoneCheck, saveTokens, sendOtp} from '@/lib/api/auth'
import api from '@/lib/axios'

// تعریف نوع داده برای متدهای ورود
type LoginMethod = "password" | "otp";

export default function LoginPage() {
  // State برای مدیریت حالت‌های مختلف کامپوننت
  const router = useRouter()
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('otp');
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [next_step, setNextState] = useState<string | null>(null);
  const [isPhoneValid, setPhoneIsValid] = useState<boolean | null>(null);
  const [isPasswordValid, setPasswordIsValid] = useState<boolean | null>(null);
  const [timer, setTimer] = useState<number>(-0.1);



  useEffect(() => {
      let interval: NodeJS.Timeout;

      if (isOtpSent && timer > 0) {
        interval = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
      }

      return () => clearInterval(interval);
    }, [isOtpSent, timer]);



  // تابع برای ارسال درخواست OTP
  const handleSendOtp = async () => {
    if (!phoneNumber) {
      setError("لطفاً شماره موبایل را وارد کنید.");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
        const result = await phoneCheck(phoneNumber, "otp")
        setNextState(result.next_step)
        if (loginMethod === 'otp'){
            await sendOtp(phoneNumber)
            setIsOtpSent(true);
            setTimer(180); // شروع تایمر از 180 ثانیه
        } else if (loginMethod === 'password') {
            const res = await passwordLoginOrSignup(phoneNumber, password)
            saveTokens(res)  // res = response.data
            router.push('/') // یا هر مسیر مناسب
        }

        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false);
        }
  };

  const handleVerify = async () => {
        try {
            if (!phoneNumber || !next_step) {
                setError('شماره یا مرحله بعدی نامشخص است.')
                return
            }

            const endpoint =
                next_step === 'register' ? '/auth/otp/register/' :
                    next_step === 'login' ? '/auth/otp/login/' :
                        null

            if (!endpoint) {
                setError('مرحله ورود نامعتبر است.')
                return
            }

            const response = await api.post(endpoint, {
                phone:phoneNumber,
                code:otp,
            })
            const { access, refresh, user } = response.data
            localStorage.setItem('access_token', access)
            localStorage.setItem('refresh_token', refresh)

            // await Login(endpoint, phoneNumber, otp)
            router.push('/')
        } catch (err: any) {
            setError(err?.response?.data?.detail || 'کد وارد شده نادرست است.')
        }
    }

  // تابع برای ارسال نهایی فرم (لاگین)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const payload = loginMethod === "password"
      ? { phoneNumber, password }
      : { phoneNumber, otp };

    try {
      // شبیه‌سازی تماس با API

        if (loginMethod === 'otp'){
            await handleVerify()
        } else if (loginMethod === 'password'){
            console.log('login with password...')
        }



      // در صورت موفقیت، کاربر را به داشبورد هدایت کنید
      // router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || "خطای ناشناخته رخ داد.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneInput = (e) => {
      const phoneRegex = /^09\d{9}$/;
      const inputValue = e.target.value
      setPhoneNumber(e.target.value)

      if (inputValue === "") {
          setPhoneIsValid(null);
        } else {
          setPhoneIsValid(phoneRegex.test(inputValue));
        }
  }

  const handlePasswordInput = (e) => {
      const passwordRegex = /^.{8,}$/
      const inputValue = e.target.value
      setPassword(e.target.value)

      if (inputValue === "") {
          setPasswordIsValid(null);
        } else {
          setPasswordIsValid(passwordRegex.test(inputValue));
        }
  }

  // تابع برای تغییر متد ورود
  const handleMethodChange = (method: LoginMethod) => {
    setLoginMethod(method);
    // ریست کردن خطاها و وضعیت OTP هنگام تغییر حالت
    setError(null);
    setIsOtpSent(false);
    setPassword("");
    setOtp("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          ورود به حساب کاربری
        </h1>

        {/* بخش دکمه‌های سوئیچ */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-gray-200 rounded-lg">
          <button
            type="button"
            onClick={() => handleMethodChange('password')}
            className={`w-full px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
              loginMethod === 'password' ? 'bg-white text-indigo-600 shadow' : 'bg-transparent text-gray-600'
            }`}
          >
            ورود با رمز عبور
          </button>
          <button
            type="button"
            onClick={() => handleMethodChange('otp')}
            className={`w-full px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
              loginMethod === 'otp' ? 'bg-white text-indigo-600 shadow' : 'bg-transparent text-gray-600'
            }`}
          >
            ورود با کد یکبار مصرف
          </button>
        </div>

        {/* نمایش خطا */}
        {error && (
          <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-200 rounded-lg text-right">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* فیلد شماره موبایل */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 text-right">
              شماره موبایل
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              value={phoneNumber}
              onChange={(e)=>handlePhoneInput(e)}
              // onChange={(e) => setPhoneNumber(e.target.value)}
              className={`w-full px-3 py-2 mt-1 text-right placeholder-gray-400 border rounded-md shadow-sm focus:outline-none
              ${
                isPhoneValid === null
                  ? "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  : isPhoneValid
                  ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                  : "border-red-500 focus:border-red-500 focus:ring-red-500"
              }`}
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
            />
              {isPhoneValid === false && (
                <p className="mt-1 text-sm text-red-600 text-right" dir='rtl'>شماره وارد شده معتبر نیست.</p>
              )}
          </div>

          {/* فیلدهای شرطی */}
          {loginMethod === "password" ? (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-right">
                رمز عبور
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => handlePasswordInput(e)}
                className={`w-full px-3 py-2 mt-1 text-right placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                ${
                    isPasswordValid === null
                        ? "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        : isPasswordValid
                            ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                            : "border-red-500 focus:border-red-500 focus:ring-red-500"
                }`}
                placeholder="••••••••"
              />
                {isPasswordValid === false && (
                <p className="mt-1 text-sm text-red-600 text-right" dir='rtl'>حداقل ۸ کاراکتر</p>
              )}
            </div>
          ) : (
            <>
              {!isOtpSent ? (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={isLoading}
                  className="w-full px-4 py-2 font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400"
                >
                  {isLoading ? "در حال ارسال..." : "ارسال کد تایید"}
                </button>
              ) : (
                <div>
                   <label htmlFor="otp" className="block text-sm font-medium text-gray-700 text-right">
                    کد تایید
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    inputMode="numeric"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-3 py-2 mt-1 text-center tracking-[0.5em] placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="— — — — — —"
                  />
                </div>
              )}
            </>
          )}

          {/* دکمه اصلی ورود */}
          {(loginMethod === 'password') && (
             <button
                type="submit"
                disabled={isLoading || !Boolean(isPhoneValid) || !Boolean(isPasswordValid)}
                className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
              >
                {isLoading ? "در حال بررسی..." : "ورود"}
              </button>
          )}

          {(isOtpSent) && (
             <button
                type="submit"
                disabled={isLoading || !Boolean(isPhoneValid)}
                className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
              >
                {isLoading ? "در حال بررسی..." : "ورود"}
              </button>
          )}

          <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
              {timer > 0 ? (
                <span>
                  ارسال مجدد کد تا {Math.floor(timer / 60)}:
                  {(timer % 60).toString().padStart(2, "0")}
                </span>
              ) : (
                loginMethod === "otp" && timer === 0 && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-indigo-600 hover:underline"
                  >
                    ارسال مجدد کد
                  </button>
                )
              )}
            </div>



          {/* حساب کاربری ندارید */}
          {(loginMethod === 'password') && (
            <div dir='rtl'>
              <span>حساب کاربری ندارید؟</span>
              <span className='m-3 cursor-pointer text-success' onClick={() => handleMethodChange('otp')}>ایجاد حساب کاربری</span>
            </div>
          )}

          {/* توضیحات ایجاد جساب */}
          {(loginMethod === 'otp') && (
              <div dir='rtl'>
                <span>
                  در صورتی که تاکنون حساب کاربری نداشته‌اید، پس از تأیید شماره موبایل، حساب شما به‌صورت خودکار ساخته می‌شود.
                </span>
              </div>
          )}
        </form>
      </div>
    </div>
  );
}