import { UserProfileClient } from './UserProfileClient';
// import {DataTable} from "@/components/orders/DataTable2";
import {type Order, type OrdersApiResponse, User} from '@/app/types';
import api from '@/lib/axios'
import {log} from "util";
// import { orderColumns } from '@/components/orders/columns2';
// import { type Order } from '@/app/types';

// داده‌های نمونه شما
const sampleOrders: OrdersApiResponse = {
    "count": 11, "next": null, "previous": null,
    "results": [
        { "id": 11, "user": 1, "user_name": null, "quantity": 1, "status": "pending", "created_at": "2025-10-15T21:08:06.148366Z", "updated_at": "2025-10-15T21:08:06.148454Z", "file": "/path/to/file", "selections": [{ "id": 17, "attribute": 1, "attribute_name": "Base Material", "selected_option": 1, "selected_option_name": "fr4", "value": "FR-4" }, { "id": 18, "attribute": 2, "attribute_name": "Layers", "selected_option": 4, "selected_option_name": "2-layer", "value": "2" }, { "id": 19, "attribute": 3, "attribute_name": "Different Design", "selected_option": 6, "selected_option_name": "اسم نوع طراحی", "value": "1" }, { "id": 20, "attribute": 4, "attribute_name": "Delivery Format", "selected_option": 10, "selected_option_name": "Single PCB", "value": "single pcb" }, { "id": 21, "attribute": 5, "attribute_name": "PCB Thickness", "selected_option": 13, "selected_option_name": "0.4", "value": "0.4" }, { "id": 22, "attribute": 6, "attribute_name": "PCB Color", "selected_option": 19, "selected_option_name": "White", "value": "white" }, { "id": 23, "attribute": 7, "attribute_name": "ویژگی 1", "selected_option": 22, "selected_option_name": "گزینه 1", "value": "گزینه 1" }] },
        { "id": 10, "user": 1, "user_name": null, "quantity": 1, "status": "processing", "created_at": "2025-10-15T21:05:29.024355Z", "updated_at": "2025-10-15T21:05:29.024523Z", "file": "/path/to/file", "selections": [{ "id": 10, "attribute": 1, "attribute_name": "Base Material", "selected_option": 1, "selected_option_name": "fr4", "value": "FR-4" }, { "id": 11, "attribute": 2, "attribute_name": "Layers", "selected_option": 4, "selected_option_name": "2-layer", "value": "2" }, { "id": 12, "attribute": 3, "attribute_name": "Different Design", "selected_option": 6, "selected_option_name": "اسم نوع طراحی", "value": "1" }, { "id": 13, "attribute": 4, "attribute_name": "Delivery Format", "selected_option": 10, "selected_option_name": "Single PCB", "value": "single pcb" }, { "id": 14, "attribute": 5, "attribute_name": "PCB Thickness", "selected_option": 13, "selected_option_name": "0.4", "value": "0.4" }, { "id": 15, "attribute": 6, "attribute_name": "PCB Color", "selected_option": 17, "selected_option_name": "Green", "value": "green" }, { "id": 16, "attribute": 7, "attribute_name": "ویژگی 1", "selected_option": 23, "selected_option_name": "گزینه 2", "value": "گزینه 2" }] }
    ]
};

// شبیه‌سازی دریافت داده از API با قابلیت جستجو
async function getOrders(query: string): Promise<Order[]> {
  // در پروژه واقعی، اینجا یک fetch به API خود می‌زنید
  const response = await api.get(`pcb/orders/?q=${query}`);
    let data;
    if (response.status === 200){
        data = await response.data
    } else {
        return
    }

  const allOrders = data.results; //sampleOrders.results;

  if (!query) {
    return allOrders;
  }
  
  // فیلتر بر اساس شماره سفارش
  return allOrders.filter(order => 
    String(order.id).includes(query)
  );
}

async function getUserProfile(): Promise<User> {
  // در پروژه واقعی، اینجا یک fetch به API خود می‌زنید
  const response = await api.get(`auth/profile/`);
    let data;
    if (response.status === 200){
        data = await response.data
        return data
    } else {
        return
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