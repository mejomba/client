import PhoneForm2 from '@/components/forms/PhoneForm2'
import OtpVerifyForm2 from '@/components/forms/OtpVerifyForm2'
import PasswordLoginForm2 from '@/components/forms/PasswordLoginForm2'
import { cookies } from 'next/headers'
import {redirect} from "next/navigation";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { phone?: string; step?: string; mode?: string }
}) {
  const { phone, step, mode } = searchParams

  const token = cookies().get('access')
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
  )
}

