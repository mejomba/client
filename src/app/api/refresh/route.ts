import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios";

const AUTH_SERVER = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

export async function POST() {
  console.log('in POST refresh')
  const cookieStore = cookies();
  const refresh = cookieStore.get("refresh")?.value;

  if (!refresh) {
    return NextResponse.json({ detail: "No refresh token found" }, { status: 401 });
  }

  try {
    // درخواست به بک‌اند برای دریافت access جدید
    const { data } = await axios.post(`${AUTH_SERVER}/auth/token/refresh/`, { refresh });

    const res = NextResponse.json({ access: data.access });

    // ست کردن access جدید
    res.cookies.set("access", data.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("❌ Token refresh failed:", error);
    return NextResponse.json({ detail: "Invalid refresh token" }, { status: 401 });
  }
}
