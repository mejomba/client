'use client';

import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
  type ColumnDef,
  type ExpandedState,
} from '@tanstack/react-table';
import { useState, Fragment } from 'react';
import { type Order } from '@/app/types';
import { OrderDetails } from './OrderDetails';

interface DataTableProps {
  data: Order[];
  columns: ColumnDef<Order>[];
}

export function DataTable({ data, columns }: DataTableProps) {
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    // ✅ تغییر اصلی اینجاست:
    // به جدول می‌گوییم که از فیلد 'id' هر سفارش به عنوان شناسه یکتا استفاده کند
    getRowId: (row) => String(row.id),

    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm text-right text-gray-700">
        {/* ... بقیه کد بدون تغییر باقی می‌ماند ... */}
        <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} scope="col" className="px-6 py-3">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <Fragment key={row.id}>
              <tr className="bg-white border-b hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
              {row.getIsExpanded() && (
                <tr className="bg-gray-50">
                  <td colSpan={row.getVisibleCells().length}>
                    <OrderDetails order={row.original} />
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}