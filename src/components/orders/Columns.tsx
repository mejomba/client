'use client';

import { ColumnDef } from '@tanstack/react-table';
import {Plus, Minus, Download, CircuitBoard, ScrollText, BadgeDollarSign} from 'lucide-react';
import { type Order } from '@/app/types';
import { useState } from "react"
import { useRef } from "react"

export default function PaymentUpload({config, orderId}: {text: string, style: string, orderId: number}) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitMessage, setsubmitMessage] = useState('')

  async function submit() {
    console.log('submit call...')
    if (!file) return

    setLoading(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("order", String(orderId))
    console.log('submit call...')

    const res = await fetch("/api/orders/payment/upload", { // API route next
      method: "POST",
      body: formData,
    })

    if(res.status === 200){
      setsubmitMessage('ذخیره شد')
      setLoading(false)
    } else {
      setsubmitMessage('خطا')
    }

    // toast success
  }

  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleOpenFileDialog() {
    fileInputRef.current?.click()
  }

  return (
        <div className="flex items-center gap-2">
      {/* hidden input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e)=> setFile(e.target.files?.[0] || null)}
      />
      <span
        className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
      >
        پیش فاکتور شده در انتظار پرداخت
      </span>
          <span className="cursor-pointer px-3 py-1 text-xs font-medium rounded-full
                          bg-green-100 text-green-900
                          transition-all duration-150
                          hover:bg-green-300"
                onClick={handleOpenFileDialog}>
            آپلود رسید
          </span>
          {file && !submitMessage && (
  <button disabled={loading} onClick={submit} className="px-3 py-2 bg-purple-600 text-white rounded">
    {loading ? "در حال آپلود..." : "ارسال رسید پرداخت"}
  </button>
)}

{submitMessage && (
  <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-200 text-green-900">
    {submitMessage}
  </span>
)}
          </div>
  )
}

// کامپوننت Badge وضعیت (مشابه قبل، فقط متن‌ها فارسی‌تر شده‌اند)
const StatusBadge = ({ status, orderId }: { status: Order['status'], orderId: number }) => {
  console.log('order id', orderId)
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
      <span>
        {status === 'quotation' && <PaymentUpload config={config} orderId={orderId} />}

        {status !== 'quotation' && (
            <span>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${config.style}`}>
                {config.text}
              </span>
            </span>
        )}
      </span>
  );
};

export const columns: ColumnDef<Order>[] = [
  // ستون برای دکمه باز/بسته کردن جزئیات
  {
    id: 'expander',
    header: () => null,
    cell: ({ row }) => (
      <button
        onClick={() => row.toggleExpanded()}
        className="text-gray-500 hover:text-gray-900"
      >
        {row.getIsExpanded() ? <Minus />: <Plus />}
      </button>
    ),
  },
  {
    accessorKey: 'id',
    header: 'شماره سفارش',
    cell: ({ row }) => <span className="font-mono">#{row.original.id}</span>,
  },
  {
    accessorKey: 'created_at',
    header: 'تاریخ ثبت',
    cell: ({ row }) => {
      const date = new Date(row.getValue('created_at'));
      return new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date);
    },
  },
    {
    accessorKey: 'quantity',
    header: 'تعداد',
  },
  {
    accessorKey: 'status',
    header: 'وضعیت',
    cell: ({ row }) => <StatusBadge status={row.getValue('status')} orderId={row.getValue('id')} />,
  },
  // ستون اکشن برای دانلود فایل
  {
    id: 'actions',
    header: () => <div className="text-center">فایل</div>,
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="text-start">
          <a
            href={order.file}
            target="_blank"
            className="inline-flex items-center justify-center p-2 text-gray-500 hover:text-sky-600 hover:bg-gray-100 rounded-full transition-colors"
            title="دانلود فایل Gerber"
          >
            <CircuitBoard size={24} />
          </a>
          {order.quotation && (
              <a
                  href={order.quotation}
                  target="_blank"
                  className="inline-flex items-center justify-center p-2 text-gray-500 hover:text-sky-600 hover:bg-gray-100 rounded-full transition-colors"
                  title="دانلود فایل پیش فاکتور"
              >
                <ScrollText size={24}/>
              </a>
          )}
          {console.log(order)}
          {order.payments_urls && order.payments_urls.map((pay: string, idx: number) => (

            <a
              key={idx}
              href={pay}
              target="_blank"
              className="inline-flex items-center justify-center p-2 text-gray-500 hover:text-sky-600 hover:bg-gray-100 rounded-full transition-colors"
              title="دانلود رسید پرداخت"
            >
              <BadgeDollarSign size={24}/>
            </a>
          ))}


        </div>
      );
    },
  },
];