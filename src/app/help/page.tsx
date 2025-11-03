import Sidebar from '@/components/help/Sidebar';
import MainContent from '@/components/help/MainContent';
import { HelpMenuItem, HelpPageContent } from '@/app/types';
import api from '@/lib/axios'

// شبیه‌سازی واکشی داده‌ها از دیتابیس یا CMS در سرور
async function getMenuData(): Promise<HelpMenuItem[]> {
  // این داده‌ها دقیقا بر اساس تصویر شما ساخته شده‌اند
  const res = await api.get('/blog/category/list/', {});

  if (res.status === 200){
    return res.data.results as HelpMenuItem
  }
}

async function getPageContent(): Promise<HelpPageContent> {
  // این داده‌ها برای محتوای اصلی بر اساس تصویر هستند
  return {
    breadcrumbs: [
      { title: 'Help Center', path: '/' },
      { title: 'PCB Files Preparation', path: '/pcb-manufacturing/files-preparation' },
    ],
    title: 'PCB Files Preparation',
    articles: [
      { title: 'Suggested Naming Patterns', path: '/articles/naming-patterns' },
      { title: 'Manually Adding Tool List for a Drill File', path: '/articles/drill-file' },
      { title: 'How to Prepare Gerber Files Before Placing Orders?', path: '/articles/prepare-gerber' },
      { title: 'How to generate Gerber and Drill files in KiCAD 8?', path: '/articles/kicad-8' },
      // ... سایر مقالات
      { title: 'How to export Altium PCB to gerber files', path: '/articles/altium' },
      { title: 'How to export PCB to gerber files in ALTIUM24', path: '/articles/altium-24' },
    ],
  };
}

// این صفحه یک Server Component است
export default async function HelpCenterPage(slug: string | null) {
  // 1. واکشی داده‌ها در سرور
  const menuItems = await getMenuData();
  const pageContent = await getPageContent();

  // مسیر فعلی را برای هایلایت کردن در سایدبار مشخص می‌کنیم
  const activePath = '/pcb-manufacturing/files-preparation';

  return (
    <div className="flex min-h-screen">
      {/* 2. پاس دادن داده‌های سرور به Client Component.
           این کامپوننت در سرور Pre-render می‌شود و در کلاینت Hydrate می‌شود.
      */}
      <Sidebar menuItems={menuItems} activePath={activePath} />

      {/* 3. پاس دادن داده‌های سرور به Server Component.
           این کامپوننت فقط در سرور رندر می‌شود.
      */}
      <MainContent content={pageContent} />
    </div>
  );
}