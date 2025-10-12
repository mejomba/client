import PhoneForm from '@/components/forms/PhoneForm'
import OtpVerifyForm from '@/components/forms/OtpVerifyForm'
import PasswordLoginForm from '@/components/forms/PasswordLoginForm'
import { cookies } from 'next/headers'
import {redirect} from "next/navigation";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {!phone && currentMode === 'otp' ? (
        <PhoneForm />
      ) : !phone && currentMode === 'password' ? (
        <PasswordLoginForm />
      ) : (
        <OtpVerifyForm phone={phone!} next_step={(step as 'login' | 'register') || 'login'} />
      )}
    </div>
  )
}
