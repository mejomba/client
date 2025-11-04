"use server";

import api from "@/lib/axios"; // نسخه‌ی سروری axios (توضیح پایین)


// type SubmitPayload = {
//   quantity: number;
//   status: string;
//   selections: {
//     attribute: number;
//     selected_option: number | null;
//     value: string | number | null;
//   }[];
// };


export async function submitPcbForm(form: FormData) {
  try {
    const response = await api.post(
      "/pcb/orders/",
      form,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error submitting form:", error);
    return {
      success: false,
      // message: error?.response?.data?.detail || "خطا در ثبت فرم",
      message: "خطا در ثبت فرم",
    };
  }
}
