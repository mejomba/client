import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { access, refresh } = await req.json();

  const res = NextResponse.json({ message: "Logged in successfully" });

  // ست کردن کوکی‌ها (HttpOnly برای امنیت)
  res.cookies.set("access", access, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  res.cookies.set("refresh", refresh, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res;
}
