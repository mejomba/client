import { UserProfileClient } from './UserProfileClient';
import {type Order, User} from '@/app/types';
import api from '@/lib/axios'

// شبیه‌سازی دریافت داده از API با قابلیت جستجو
async function getOrders(query: string): Promise<Order[]> {
  // در پروژه واقعی، اینجا یک fetch به API خود می‌زنید
  const response = await api.get(`pcb/orders/?q=${query}`);
    let data;
    if (response.status === 200){
        data = await response.data
    } else {
        return []
    }

  const allOrders = data.results; //sampleOrders.results;

  if (!query) {
    return allOrders;
  }
  
  // فیلتر بر اساس شماره سفارش
  return allOrders.filter((order: Order) =>
    String(order.id).includes(query)
  );
}

async function getUserProfile(): Promise<User> {
  // در پروژه واقعی، اینجا یک fetch به API خود می‌زنید
  try {
   const response = await api.get(`auth/profile/`);
    let data;
    if (response.status === 200){
        data = await response.data
        return data
    } else {
        throw new Error('error at profile')
    }
  } catch (error){
    console.log(error)
    throw new Error('error at profile')
  }
}

export default async function ProfilePage({ searchParams }: {
  searchParams?: {
    q?: string;
  };
}) {
  const query = searchParams?.q || '';
  const orders = await getOrders(query);
  const user = await getUserProfile()

  return <UserProfileClient initialOrders={orders} user={user} />;
  // return <DataTable data={orders} columns={orderColumns} />;
}