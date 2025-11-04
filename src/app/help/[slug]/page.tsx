import Sidebar from '@/components/help/Sidebar';
import MainContent from '@/components/help/MainContent';
import {HelpMenuItem, HelpPageContentList} from '@/app/types';
import api from '@/lib/axios'

// شبیه‌سازی واکشی داده‌ها از دیتابیس یا CMS در سرور
async function getMenuData(): Promise<HelpMenuItem[]> {
  // این داده‌ها دقیقا بر اساس تصویر شما ساخته شده‌اند
  const res = await api.get('/blog/category/list/', {});

  if (res.status === 200) {
    return res.data.results as HelpMenuItem[];
  }

  // fallback standard type safe
  return [];
}

async function getPageContent({ params }: { params: { slug: string } }): Promise<HelpPageContentList[]> {
  try{
    const res = await api.get(`/blog/category/list/slug/${params.slug}/`)
    if (res.status === 200){
      return res.data
    }

    throw new Error("Unexpected response status")

  } catch (error) {
    console.error("Error fetching help page content:", error);
    throw new Error("Failed to fetch help page content");
  }
}

// این صفحه یک Server Component است
export default async function HelpDetailCenterPage({ params }: { params: { slug: string } }) {
  // 1. واکشی داده‌ها در سرور
  const { slug } = params
  const menuItems = await getMenuData();
  const pageContent = await getPageContent({ params: { slug } });

  // مسیر فعلی را برای هایلایت کردن در سایدبار مشخص می‌کنیم
  const activePath = slug;

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