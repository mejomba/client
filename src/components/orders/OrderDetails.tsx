import { type Order } from '@/app/types';

export function OrderDetails({ order }: { order: Order }) {
    console.log('order details...')
  return (
    <div className="p-4 bg-gray-50">
      <h4 className="font-semibold mb-3 text-base">مشخصات فنی سفارش</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-3 text-sm">
        {order.selections.map((selection) => (
          <div key={selection.id}>
            <span className="text-gray-500">{selection.attribute_name}:</span>
            <span className="font-medium mr-2 text-gray-800">{selection.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}