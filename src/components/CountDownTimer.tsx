"use client";

import { useState, useEffect } from "react";

export default function CountdownTimer({ startSeconds = 90 }) {
  const [timeLeft, setTimeLeft] = useState(startSeconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    if (timeLeft <= 0) {
      setIsActive(false);
      return;
    }

    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isActive]);

  const handleResend = () => {
    // اینجا می‌تونی درخواست ارسال مجدد OTP بزنی
    console.log("ارسال مجدد کد تأیید...");

    setTimeLeft(startSeconds); // شمارش مجدد از ابتدا
    setIsActive(true); // فعال‌سازی دوباره تایمر
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <div className="flex justify-center items-center text-sm text-gray-700 mt-3">
      {isActive ? (
        <span>
          ارسال مجدد کد تا{" "}
          <span className="font-semibold text-indigo-600">
            {minutes}:{seconds}
          </span>
        </span>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          className="text-indigo-600 hover:underline font-medium"
        >
          ارسال مجدد کد
        </button>
      )}
    </div>
  );
}
