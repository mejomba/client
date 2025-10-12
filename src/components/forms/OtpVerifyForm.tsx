import { verifyOtpAction } from '@/lib/actions/auth'

export default function OtpVerifyForm({
  phone,
  next_step,
}: {
  phone: string
  next_step: 'login' | 'register'
}) {
  return (
    <form
      action={verifyOtpAction}
      className="max-w-sm mx-auto p-4 bg-white rounded-2xl shadow-md space-y-4"
    >
      <h2 className="text-lg font-semibold text-center">تأیید کد ارسال‌شده</h2>

      <input type="hidden" name="phone" value={phone} />
      <input type="hidden" name="next_step" value={next_step} />

      <input
        type="text"
        name="otp_code"
        placeholder="کد ۶ رقمی"
        className="w-full border border-gray-300 rounded-md p-2 text-center focus:ring-2 focus:ring-blue-500 tracking-widest"
        required
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white rounded-md py-2 font-medium hover:bg-green-700"
      >
        تأیید
      </button>
    </form>
  )
}
