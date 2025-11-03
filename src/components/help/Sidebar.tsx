'use client'; // این کامپوننت تعاملی است و باید در کلاینت اجرا شود

import { HelpMenuItem } from '@/app/types';
import Link from 'next/link';

import { useState, useEffect } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';


// تایپ پراپس‌های کامپوننت
interface SidebarProps {
  id: number;
  menuItems: HelpMenuItem[];
  activePath: string; // مسیر فعلی برای هایلایت کردن
}

// کامپوننت بازگشتی داخلی برای رندر درخت منو
function MenuTree({
  items,
  level,
  activePath,
  openItems,
  toggleItem
}: {
  items: HelpMenuItem[];
  level: number;
  activePath: string;
  openItems: Set<string>;
  toggleItem: (id: string) => void;
}) {

  // محاسبه padding بر اساس سطح (level) برای ایجاد تورفتگی
  const paddingLeft = `${level * 16 + 16}px`; // 16px per level + 16px base

  return (
    <ul className="space-y-1">
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        const isActive = activePath === item.slug;
        const hasChildren = item.child && item.child.length > 0;
        return (
          <li key={item.id}>
            <div
              className={`flex items-center justify-between rounded-md cursor-pointer
                ${isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'}
              `}
              style={{ paddingLeft }}
              onClick={() => hasChildren && toggleItem(item.id)}
            >
              <Link
                  onClick={(e) => {
                    hasChildren && e.preventDefault();
                  }}
                href={hasChildren ? "" : "/help/" + item.slug}
                className="py-2 flex-grow"
              >
                {item.title}
              </Link>

              {/* آیکون فلش برای باز و بسته شدن */}
              {hasChildren && (
                <span className="px-2 py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : 'rotate-0'}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </span>
              )}
            </div>

            {/* رندر بازگشتی فرزندان در صورت باز بودن */}
            {isOpen && hasChildren && (
              <MenuTree
                items={item.child!}
                level={level + 1}
                activePath={activePath}
                openItems={openItems}
                toggleItem={toggleItem}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}


export default function Sidebar({ menuItems, activePath }: SidebarProps) {
  const activeId = menuItems.find((item) => item.slug === activePath)?.id || null;

  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set([activeId?.toString()])
  );
  const [collapsed, setCollapsed] = useState(false);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="relative">
      {/* نوار کلیک‌پذیر لبه‌ای */}
      <div
        onClick={() => setCollapsed(!collapsed)}
        className={`absolute top-0 right-0 h-full cursor-pointer transition-colors duration-200
          ${collapsed ? 'w-3 bg-gray-200 hover:bg-gray-300' : 'w-3 bg-gray-100 hover:bg-gray-200'}
        `}
        title={collapsed ? 'باز کردن منو' : 'بستن منو'}
      >
        <div className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2">
          {collapsed ? (
            <ChevronRight size={14} className="text-gray-500" />
          ) : (
            <ChevronLeft size={14} className="text-gray-500" />
          )}
        </div>
      </div>

      {/* سایدبار */}
      <aside
        className={`sidebar-scroll h-screen overflow-y-auto bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
        ${collapsed ? 'w-3 overflow-y-hidden' : 'w-64'}
        `}
      >
        <div
          className={`p-4 transition-opacity duration-300 ${
            collapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <h2 className="text-lg font-bold text-gray-900 mb-4 whitespace-nowrap">
            JLCPCB Help Center
          </h2>

          {/* جستجو */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </span>
          </div>

          {/* درخت منو */}
          <nav>
            <MenuTree
              items={menuItems}
              level={0}
              activePath={activePath}
              openItems={openItems}
              toggleItem={toggleItem}
            />
          </nav>
        </div>
      </aside>
    </div>
  );
}

// کامپوننت اصلی سایدبار
// export default function Sidebar({ menuItems, activePath }: SidebarProps) {
//   // استیت برای نگهداری ID آیتم‌های باز شده
//   // ما آیتم‌های فعال فعلی را به صورت پیش‌فرض باز می‌کنیم
//   console.log(activePath)
//   menuItems.forEach(item => {
//     console.log(item.slug, item.id)
//   })
//   const activeId = menuItems.find(item => item.slug == activePath)?.id || null;
//   console.log('active id:', activeId)
//
//
//   const [openItems, setOpenItems] = useState<Set<string>>(
//     new Set([activeId?.toString()]) // پیش‌فرض بر اساس تصویر
//   );
//   console.log('set open: ', activeId)
//
//   // تابع برای باز و بسته کردن یک آیتم
//   const toggleItem = (id: string) => {
//     setOpenItems((prevOpenItems) => {
//       const newOpenItems = new Set(prevOpenItems);
//       if (newOpenItems.has(id)) {
//         newOpenItems.delete(id);
//       } else {
//         newOpenItems.add(id);
//       }
//       return newOpenItems;
//     });
//   };
//
//   return (
//     <aside className="w-64 bg-white border-l border-gray-200 p-4 h-screen overflow-y-auto">
//       <h2 className="text-lg font-bold text-gray-900 mb-4">
//         JLCPCB Help Center
//       </h2>
//
//       {/* بخش جستجو */}
//       <div className="relative mb-4">
//         <input
//           type="text"
//           placeholder="Search"
//           className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm"
//         />
//         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="w-5 h-5"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
//             />
//           </svg>
//         </span>
//       </div>
//
//       {/* رندر درخت منو */}
//       <nav>
//         <MenuTree
//           items={menuItems}
//           level={0}
//           activePath={activePath}
//           openItems={openItems}
//           toggleItem={toggleItem}
//         />
//       </nav>
//     </aside>
//   );
// }