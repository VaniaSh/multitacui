'use client'

import { Order } from '@/lib/models/OrderModel'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function MyOrders() {
  const router = useRouter()
  const { data: orders, error } = useSWR(`/api/orders/mine`)

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <></>

  if (error) return 'An error has occurred.'
  if (!orders) return 'Завантаження...'

  return (
    <div className="max-w-screen-2xl mx-auto px-5">
      <table className="w-full">
        <thead className="p-3">
          <tr className="text-left bg-secondary">
            <th className="p-3">Дата</th>
            <th className="p-3">Загалом</th>
            <th className="p-3">Доставка</th>
            <th className="p-3">Дії</th>
          </tr>
        </thead>
        <tbody className="bg-primary-foreground">
          {orders.map((order: Order) => (
            <tr key={order._id}>
              <td  className="p-3">{order._id.substring(20, 24)}</td>
              <td className="p-3">{order.createdAt.substring(0, 10)}</td>
              <td className="p-3">₴{order.totalPrice}</td>
              <td className="p-3">
                {order.isDelivered && order.deliveredAt
                  ? `${order.deliveredAt.substring(0, 10)}`
                  : 'Не доставлено'}
              </td>
              <td className="p-3">
                <Link href={`/order/${order._id}`} passHref>
                  Деталі
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
