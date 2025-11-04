import Sidebar from '@/components/help/Sidebar';
import { HelpMenuItem } from '@/app/types';
import api from '@/lib/axios'

// شبیه‌سازی واکشی داده‌ها از دیتابیس یا CMS در سرور
async function getMenuData(): Promise<HelpMenuItem[]> {
  try {
    const res = await api.get('/blog/category/list/')
    if (res.status === 200) {
      return res.data.results as HelpMenuItem[]
    }
    return []
  } catch (error) {
    console.error("getMenuData error:", error)
    return []
  }
}

// async function getPageContent(): Promise<HelpPageContent> {
//   return {}
// }

// این صفحه یک Server Component است
// export default async function HelpCenterPage({ params }: { params: { slug: string } }) {
export default async function HelpCenterPage() {
  // 1. واکشی داده‌ها در سرور
  const menuItems = await getMenuData();
  // const pageContent = await getPageContent();

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
      {/*<MainContent content={pageContent} />*/}
      some content for help landing page...
    </div>
  );
}