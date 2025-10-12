import OtpVerifyFormClient from "@/components/forms/OtpVerifyFormClient";

export default function OtpVerifyForm2({
  phone,
  next_step,
}: {
  phone: string
  next_step: 'login' | 'register'
}) {
  return (
    <OtpVerifyFormClient phone={phone} next_step={next_step} />
  )
}
