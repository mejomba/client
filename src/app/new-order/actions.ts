"use server";

import { cookies } from "next/headers";
import api from "@/lib/axios"; // نسخه‌ی سروری axios (توضیح پایین)

export async function submitPcbForm(formData: Record<string, string>) {
// export async function submitPcbForm(payload: Record<string, any>) {
  try {
    // const cookieStore = cookies();
    // const accessToken = cookieStore.get("access_token")?.value;
    //
    // if (!accessToken) {
    //   throw new Error("توکن یافت نشد، لطفا دوباره وارد شوید.");
    // }

    const response = await api.post(
      "/pcb/orders/",
      formData,
      // payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return { success: true, data: response.data };
  } catch (error: any) {
    // console.error("Error submitting form:", error);
    console.error("Error submitting form:");
    return {
      success: false,
      message: error?.response?.data?.detail || "خطا در ثبت فرم",
    };
  }
}
