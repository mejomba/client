export interface ApiOption {
  id: number;
  attribute: number;
  value: string;
  display_name: string;
  is_default: boolean;
  display_order: number;
  file_url: string;
}

export interface ApiAttribute {
  id: number;
  group: number;
  name: string;
  display_name: string;
  control_type: 'radio_button' | 'text_input'; // می توانید انواع دیگر را اضافه کنید
  display_order: number;
  options: ApiOption[];
  guid: Guid
}

export interface Guid {
  id: number;
  slug: string;
  guid_content: string;
}
export interface ApiGroup {
  id: number;
  name: string;
  display_name: string;
  display_order: number;
  attributes: ApiAttribute[];
}

export interface ApiResponse {
  count: number;
  next: null;
  previous: null;
  results: ApiGroup[];
}

// نوع داده برای هر آیتم در آرایه selections
export type Selection = {
  id: number;
  attribute: number;
  attribute_name: string;
  selected_option: number;
  selected_option_name: string;
  value: string;
};

// نوع داده اصلی برای هر سفارش
export type Order = {
  id: number;
  user: number;
  user_name: string | null;
  quantity: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'; // می‌توانید وضعیت‌های دیگر را اضافه کنید
  created_at: string; // تاریخ به صورت ISO string
  updated_at: string;
  file: string;
  quotation: string;
  payments_urls: string[];
  selections: Selection[];
};

// نوع داده برای پاسخ کامل API
export type OrdersApiResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Order[];
};

// تعریف ساختار داده‌ای برای هر آیتم منو
// این ساختار بازگشتی به ما اجازه می‌دهد تا بی‌نهایت زیرمنو داشته باشیم
export interface HelpMenuItem {
  id: string;
  title: string;
  slug: string;
  child?: HelpMenuItem[]; // هر آیتم می‌تواند آرایه‌ای از آیتم‌های فرزند داشته باشد
}

// تعریف داده‌های لازم برای محتوای اصلی
export interface HelpPageContent {
  breadcrumbs: { title: string; path: string }[];
  title: string;
  articles: { title: string; path: string }[];
}

export interface HelpPageContentList {
  id: number;
  title: string;
  slug: string;
  category_name: string;
  breadcrumb: string[];
}

export interface User {
  id: number;
}