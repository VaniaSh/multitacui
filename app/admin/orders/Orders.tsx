'use client'
import { Order } from '@/lib/models/OrderModel'
import Link from 'next/link'
import useSWR from 'swr'

export default function Orders() {
  const { data: orders, error } = useSWR(`/api/admin/orders`)
  if (error) return 'An error has occurred.'
  if (!orders) return 'Loading...'

  return (
    <div>
      <h1 className="py-4 text-2xl">Замовлення</h1>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="p-3">
            <tr className='text-left bg-secondary'>
              <th className="p-3">ID</th>
              <th className="p-3">Користувач</th>
              <th className="p-3">Дата</th>
              <th className="p-3">Загалом</th>
              <th className="p-3">Статус</th>
              <th className="p-3">Доставка</th>
              <th className="p-3">Дії</th>
            </tr>
          </thead>
          <tbody className="bg-primary-foreground">
            {orders.map((order: Order) => (
              <tr key={order._id}>
                <td className="p-3">..{order._id.substring(20, 24)}</td>
                <td className="p-3">{order.user?.name || 'Користувача було видалено'}</td>
                <td className="p-3">{order.createdAt.substring(0, 10)}</td>
                <td className="p-3">${order.totalPrice}</td>
                <td className="p-3">
                  {order.isPaid && order.paidAt
                    ? `${order.paidAt.substring(0, 10)}`
                    : 'Не оплачено'}
                </td>
                <td className="p-3">
                  {order.isDelivered && order.deliveredAt
                    ? `${order.deliveredAt.substring(0, 10)}`
                    : 'Не доставлено'}
                </td>
                <td className="p-3">
                  <Link href={`/order/${order._id}`} passHref>
                    Детальніше
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
