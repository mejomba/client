'use client';

import { useState } from 'react';
import { type Order, User } from '@/app/types';
import { DataTable } from '@/components/orders/DataTable'; // مسیر کامپوننت‌ها را چک کنید
import { columns } from '@/components/orders/Columns';
import { SearchInput } from '@/components/orders/SearchInput';
import {formatNumber} from "@/lib/utils";


/* ---------------------- Helper UI components ---------------------- */
function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="p-3 sm:p-4 rounded-lg bg-white shadow-md">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="text-xl sm:text-2xl font-semibold">{formatNumber(Number(value))}</div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-3 sm:p-4 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <h3 className="text-sm sm:text-base font-medium">{title}</h3>
      </div>
      {children}
    </div>
  );
}
// ... بقیه کامپوننت‌های کمکی

export function UserProfileClient({ initialOrders, user }: { initialOrders: Order[], user: User }) {
  const [tab, setTab] = useState("orders"); // تب پیش‌فرض را روی سفارش‌ها گذاشتم

  return (
    <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8" dir="rtl">
      {/* Header, Stats, and other sections from your code... */}
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6">
        <div className="w-20 h-20 sm:w-28 sm:h-28 rounded bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center shadow-md">
          <img
            src={user.avatar}
            alt="avatar"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col sm:flex-row sm:justify-between w-full">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold">{user.phone}</h1>
            <p className="text-sm text-slate-500 mt-1 sm:mt-2">کاربر حرفه‌ای — سفارش‌‍دهنده PCB</p>
            <div className="mt-3 flex flex-col sm:flex-row gap-2 sm:gap-3">
              <a href="new-order" className="px-4 py-2 rounded-lg bg-sky-600 text-white text-sm w-full sm:w-auto">افزودن سفارش جدید</a>
              {/*<button className="px-4 py-2 rounded-lg border text-sm w-full sm:w-auto">ویرایش پروفایل</button>*/}
            </div>
          </div>

          {/*<div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 mt-3 sm:mt-0">*/}
          {/*  <div className="text-sm text-slate-500">اعتبار حساب</div>*/}
          {/*  <div className="text-lg font-medium">*/}
          {/*    <span className="me-2">{formatNumber(12345678)}</span>*/}
          {/*    <span className="text-lg font-medium">تومان</span>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </header>


      {/* ... بخش Stats ... */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="سفارش‌ها" value={initialOrders.length} />
        {/*<StatCard title="پروژه‌های ذخیره‌شده" value={6} />*/}
        {/*<StatCard title="تراکنش‌های موفق" value={42} />*/}
        {/*<StatCard title="میانگین زمان تولید" value={`3.2 روز`} />*/}
      </section>

      {/* Tabs */}
      <nav className="mb-6 border-b">
        <ul className="flex flex-wrap gap-2 sm:gap-3">
          {[
            ["overview", "نمای کلی"],
            ["orders", "سفارش‌ها"],
            ["actions", "اقدامات"],
            ["settings", "تنظیمات"]
          ].map(([key, label]) => (
            <li key={key}>
              <button
                onClick={() => setTab(key)}
                className={`py-2 sm:py-3 px-3 sm:px-4 -mb-px ${tab === key ? "border-b-2 border-sky-600 font-semibold" : "text-slate-600"}`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Tab content */}
      <section>
        {tab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <Card title="آخرین سفارش‌ها">
                <OrdersList orders={initialOrders} />
              </Card>

              {/*<Card title="تنظیمات سریع">*/}
              {/*  <ul className="space-y-2 sm:space-y-3 text-sm text-slate-700">*/}
              {/*    <li>اعلان ایمیل: فعال</li>*/}
              {/*    <li>ارسال اتوماتیک فایل Gerber: فعال</li>*/}
              {/*    <li>فرمت پیش‌فرض: 2-layer, HASL</li>*/}
              {/*  </ul>*/}
              {/*</Card>*/}

              <Card title="تماس پشتیبانی">
                <div className="text-sm">
                  <p>پشتیبانی سفارش‌ها: <strong>support@pcbshop.example</strong></p>
                  <p className="mt-1 sm:mt-2">ساعات پاسخگویی: 09:00 — 18:00</p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {tab === "orders" && (
           <div className="space-y-4">
              <SearchInput />
              <DataTable columns={columns} data={initialOrders} />
           </div>
        )}

        {tab === "actions" && (
          <div>
            <Card title="پروژه‌های ذخیره‌شده">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {sampleDesigns.map((d) => (
                  <div key={d.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">{d.name}</div>
                        <div className="text-xs text-slate-500">{d.updated}</div>
                      </div>
                      <div className="text-sm">{d.layers}L</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {tab === "settings" && (
          <div>
            <Card title="اطلاعات حساب">
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <label className="block">
                  <div className="text-sm text-slate-600">نام کامل</div>
                  <input className="mt-1 w-full rounded-md border px-3 py-2" defaultValue="Mojtaba Aminzadeh" />
                </label>
                <label className="block">
                  <div className="text-sm text-slate-600">ایمیل</div>
                  <input className="mt-1 w-full rounded-md border px-3 py-2" defaultValue="mojtaba@example.com" />
                </label>
                <label className="block sm:col-span-2">
                  <div className="text-sm text-slate-600">آدرس</div>
                  <input className="mt-1 w-full rounded-md border px-3 py-2" defaultValue="Berlin, Germany" />
                </label>
                <div className="sm:col-span-2 flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button className="px-4 py-2 rounded-lg bg-sky-600 text-white w-full sm:w-auto">ذخیره</button>
                  <button className="px-4 py-2 rounded-lg border w-full sm:w-auto">لغو</button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </section>
    </main>
  );
}

// =============================================
// =============================================


function OrdersList({ orders }: { orders: Order[] }) {
  if (!orders?.length)
    return <div className="text-sm text-slate-500">هیچ سفارشی ثبت نشده است.</div>;

    const StatusBadge = ({ status }: { status: Order['status'] }) => {
      const statusConfig = {
        pending: { text: 'در انتظار بررسی', style: 'bg-yellow-100 text-yellow-800' },
        quotation: { text: 'پیش فاکتور شده (در انتظار پرداخت)', style: 'bg-blue-100 text-blue-800' },
        process: { text: 'در حال ساخت', style: 'bg-purple-100 text-purple-800' },
        pending_delivery: { text: 'در انتظار تحویل', style: 'bg-green-100 text-yellow-800' },
        deliver: { text: 'تحول شده', style: 'bg-green-100 text-green-800' },
        canceled: { text: 'لغو شده', style: 'bg-red-100 text-red-800' },
      };
      const config = statusConfig[status] || { text: status, style: 'bg-gray-100 text-gray-800' };

      return (
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${config.style}`}>
          {config.text}
        </span>
      );
    };

  return (
    <ul className="space-y-3">
      {orders.map((order) => (
        <li
          key={order.id}
          className="p-3 border rounded-lg hover:bg-slate-50 transition-all"
        >
          {/* اطلاعات اصلی سفارش */}
          <div className="flex items-center justify-between mb-1">
            <div className="font-medium text-sm">
              سفارش #{order.id} —{" "}
              <span className="text-slate-500 capitalize"><StatusBadge status={order.status} /></span>
            </div>
            <div className="text-xs text-slate-400">
              {new Date(order.created_at).toLocaleString("fa-IR")}
            </div>
          </div>

          {/* تعداد آیتم‌ها */}
          {/*<div className="text-xs text-slate-600 mb-2">*/}
          {/*  تعداد: <span className="font-medium">{order.quantity}</span>*/}
          {/*</div>*/}

          {/* ویژگی‌ها (در صورت وجود selections) */}
          {order.selections && order.selections.length > 0 ? (
            <div className="bg-slate-50 border-t mt-2 p-2 rounded-md">
              <div className="text-xs text-slate-500 mb-1">ویژگی‌ها:</div>
              <ul className="text-xs text-slate-700 space-y-1">
                {order.selections.map((sel) => (
                  <li key={sel.id}>
                    <span className="font-medium">{sel.attribute_name}:</span>{" "}
                    {sel.value}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-xs text-slate-400 italic">
              بدون ویژگی انتخابی
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

/* ---------------------- Sample data ---------------------- */

const sampleDesigns = [
  { id: 1, name: "Motor controller", updated: "2025-09-10", layers: 2 },
  { id: 2, name: "Power board (mini)", updated: "2025-08-30", layers: 4 },
  { id: 3, name: "Breakout module", updated: "2025-07-21", layers: 1 },
];
