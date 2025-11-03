'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import api from "@/lib/axios";
import { z } from 'zod'
import axios from "axios/index";

// اعتبارسنجی با Zod (اختیاری ولی حرفه‌ای)
const phoneSchema = z.object({
  phone: z
    .string()
    .regex(/^09\d{9}$/, { message: 'شماره موبایل معتبر نیست.' }),
})

const API_BASE = process.env.NEXT_PUBLIC_BASE_URL || 'http://127.0.0.1:8000/api/v1'

// export async function sendOtpAction(formData: FormData) {
//   const phone = formData.get('phone') as string
//
//   const phone_check_res = await api.post('auth/phone-check/', { phone, method:'otp' })
//   const otp_res = await api.post('/auth/otp/send/', { phone })
//
//   if (![200, 201].includes(otp_res.status) || ![200, 201].includes(phone_check_res.status)) {
//     throw new Error('ارسال کد با مشکل مواجه شد.')
//   }
//
//   const next_step = phone_check_res.data.next_step
//
//   redirect(`/auth/login?phone=${phone}&step=${next_step}`)
// }

export async function sendOtpAction(prevState: any, formData: FormData) {
  const phone = formData.get('phone') as string
  let next_step;

  // 🔸 اعتبارسنجی شماره
  const result = phoneSchema.safeParse({ phone })
  if (!result.success) {
    return { error: result.error.issues[0].message }
  }

  // 🔸 تماس با API بک‌اند
  try {
    const phone_check_res = await api.post('auth/phone-check/', { phone, method:'otp' })
    const otp_res = await api.post('/auth/otp/send/', { phone })


    if (![200, 201].includes(otp_res.status) || ![200, 201].includes(phone_check_res.status)) {
      throw new Error('ارسال کد با مشکل مواجه شد.')
    }

    // موفق → انتقال به صفحه بعدی
    next_step = phone_check_res.data.next_step
    // return { success: true }
  } catch (e) {
    return { error: 'ارتباط با سرور برقرار نشد.' }
  }

  redirect(`/auth/login?phone=${phone}&step=${next_step}`)
}

export async function verifyOtpAction(prevState: any, formData: FormData) {
  const phone = formData.get('phone') as string
  const code = formData.get('otp_code') as string
  const next_step = formData.get('next_step') as 'login' | 'register'

  const endpoint =
    next_step === 'register' ? '/auth/otp/register/' : '/auth/otp/verify/'

  try {
    const res = await api.post(endpoint, {
                phone:phone,
                code:code,
            })

    if (![200, 201].includes(res.status)) throw new Error('کد وارد شده نادرست است.')

    const data = await res.data

    if (data.access && data.refresh) {
      const cookieStore = cookies()
      cookieStore.set('access', data.access, { httpOnly: true })
      cookieStore.set('refresh', data.refresh, { httpOnly: true})
    }
  } catch (error: any) {
  if (error.response) {
    const data = error.response.data;

    // اگر خطا به شکل {"detail": "..."} باشد
    if (data.detail) {
      return { error: data.detail };
    }

    // اگر خطا شامل فیلدهای مختلف باشد، مثل {"phone": ["شماره نامعتبر است."]}
    if (typeof data === "object") {
      const firstKey = Object.keys(data)[0];
      const firstError = data[firstKey];

      // اگر مقدار یک آرایه باشد (مثل لیست خطاهای serializer)
      if (Array.isArray(firstError)) {
        return { error: firstError[0] };
      }

      // اگر مقدار فقط رشته باشد
      if (typeof firstError === "string") {
        return { error: firstError };
      }
    }

    // اگر هیچکدوم از بالا نبود
    return { error: "در پردازش درخواست خطایی رخ داد." };
  }

  // اگر سرور پاسخی نداده باشد
  if (error.request) {
    return { error: "ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید." };
  }

  // سایر خطاهای غیرمنتظره (مثلاً کدنویسی یا باگ)
  return { error: error.message || "خطای ناشناخته‌ای رخ داد." };
}

  redirect('/profile/')
}

// 🔹 ورود با رمز عبور
export async function passwordLoginAction(prevState: any, formData: FormData) {
  const phone = formData.get('phone') as string
  const password = formData.get('password') as string
  const endpoint = '/auth/login/'

  try {
    const res = await api.post(endpoint, {
                phone:phone,
                password:password,
            })

    if (![200, 201].includes(res.status)) throw new Error('کد وارد شده نادرست است.')

    const data = await res.data

    if (data.access && data.refresh) {
      const cookieStore = cookies()
      cookieStore.set('access', data.access, { httpOnly: true })
      cookieStore.set('refresh', data.refresh, { httpOnly: true })
    }
  } catch (error: any) {
    if (error.response) {
      const data = error.response.data;

      // اگر خطا به شکل {"detail": "..."} باشد
      if (data.detail) {
        return {error: data.detail};
      }

      // اگر خطا شامل فیلدهای مختلف باشد، مثل {"phone": ["شماره نامعتبر است."]}
      if (typeof data === "object") {
        const firstKey = Object.keys(data)[0];
        const firstError = data[firstKey];

        // اگر مقدار یک آرایه باشد (مثل لیست خطاهای serializer)
        if (Array.isArray(firstError)) {
          return {error: firstError[0]};
        }

        // اگر مقدار فقط رشته باشد
        if (typeof firstError === "string") {
          return {error: firstError};
        }
      }

      // اگر هیچکدوم از بالا نبود
      return {error: "در پردازش درخواست خطایی رخ داد."};
    }

    // اگر سرور پاسخی نداده باشد
    if (error.request) {
      return {error: "ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید."};
    }

    // سایر خطاهای غیرمنتظره (مثلاً کدنویسی یا باگ)
    return {error: error.message || "خطای ناشناخته‌ای رخ داد."};
  }

  redirect('/profile/')
}


export async function logout() {
  const cookieStore = cookies();
  cookieStore.delete("access"); // نام کوکی توکن JWT
  cookieStore.delete("refresh"); // نام کوکی توکن JWT
  redirect('/')
}
