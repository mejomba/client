import { NextResponse } from "next/server"
import api from "@/lib/axios";

export async function POST(req: Request) {
  const formData = await req.formData()
  const djangoRes = await api.post("/pcb/order_payment_receipt/upload/", formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
  )

  return NextResponse.json(await djangoRes.data, { status: djangoRes.status })
}
