'use client'
import {PayPalButtons, PayPalScriptProvider} from '@paypal/react-paypal-js'
import {OrderItem} from '@/lib/models/OrderModel'
import {useSession} from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import {Button} from "@/components/ui/button";
import {normalizeTimestamp} from "@/lib/utils";

export default function OrderDetails({
                                         orderId,
                                         paypalClientId,
                                     }: {
    orderId: string
    paypalClientId: string
}) {
    const {trigger: deliverOrder, isMutating: isDelivering} = useSWRMutation(
        `/api/orders/${orderId}`,
        async (url) => {
            const res = await fetch(`/api/admin/orders/${orderId}/deliver`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await res.json()
            res.ok
                ? toast.success('Замовлення успішно доставлене')
                : toast.error(data.message)
        }
    )

    const {data: session} = useSession()

    function createPayPalOrder() {
        return fetch(`/api/orders/${orderId}/create-paypal-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((order) => order.id)
    }

    function onApprovePayPalOrder(data: any) {
        return fetch(`/api/orders/${orderId}/capture-paypal-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((orderData) => {
                toast.success('Order paid successfully')
            })
    }

    const {data, error} = useSWR(`/api/orders/${orderId}`)

    if (error) return error.message
    if (!data) return 'Loading...'

    const {
        paymentMethod,
        shippingAddress,
        items,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        isDelivered,
        deliveredAt,
        isPaid,
        paidAt,
    } = data

    console.log(data,'data')
    return (
        <div className="px-5">
            <h1 className="text-2xl px-5 py-6">Унікальний номер замовлення {orderId}</h1>
            <div className="max-w-screen-2xl mx-auto grid md:grid-cols-4 md:gap-5 my-4">
                <div className="overflow-x-auto md:col-span-3">
                    <div className="bg-primary-foreground">
                        <div className="border border-secondary p-5">
                            <h2 className="text-xl font-semibold mb-1">Адреса доставки та дані отримувача</h2>
                            <p>{shippingAddress.fullName}</p>
                            <p>
                                {shippingAddress.address}, {shippingAddress.city},{' '}
                            </p>
                            {isDelivered ? (
                                <div
                                    className="text-green-700 mt-3 bg-green-300 w-fit whitespace-nowrap px-3 py-1 rounded-lg">Доставленно
                                    в {normalizeTimestamp(deliveredAt)}</div>
                            ) : (
                                <div
                                    className="text-orange-500 mt-3 bg-orange-200 w-fit whitespace-nowrap px-3 py-1 rounded-lg">Не
                                    Доставленно</div>
                            )}
                        </div>
                    </div>

                    <div className="bg-primary-foreground mt-4">
                        <div className="border border-secondary p-5">
                            <h2 className="text-xl font-semibold mb-1">Метод оплати</h2>
                            <p>{paymentMethod}</p>
                            {isPaid ? (
                                <div
                                    className="text-purple-700 mt-3 bg-purple-200 w-fit whitespace-nowrap px-3 py-1 rounded-lg">Оплачено
                                    в {paidAt}</div>
                            ) : (
                                <div
                                    className="text-purple-700 mt-3 bg-purple-200 w-fit whitespace-nowrap px-3 py-1 rounded-lg">Оплата
                                    при отриманні</div>
                            )}
                        </div>
                    </div>

                    <div className="bg-primary-foreground mt-4">
                        <div className="border border-secondary p-5">
                            <h2 className="text-xl font-semibold mb-1">Ваше замовлення</h2>
                            <table className="w-full">
                                <thead>
                                <tr>
                                    <th className="text-left font-light">Зображення</th>
                                    <th className="text-left font-light">Назва товару</th>
                                    <th className="text-left font-light">Кількість</th>
                                    <th className="text-left font-light">Ціна</th>
                                </tr>
                                </thead>
                                <tbody>
                                {items.map((item: OrderItem) => (
                                    <tr key={item.slug}>
                                        <td className="py-4">
                                            <Link
                                                href={`/product/₴{item.slug}`}
                                                className="flex items-center"
                                            >
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={78}
                                                    height={78}
                                                ></Image>
                                            </Link>
                                        </td>
                                        <td className="py-4">
                        <span className="px-2">
                            {item.name}({item.color} {item.size})
                          </span>
                                        </td>
                                        <td className="py-4">
                                            <span>{item.qty}</span>
                                        </td>
                                        <td className="py-4">₴{item.price}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg-primary-foreground">
                        <div className="border border-secondary p-5">
                            <h2 className="text-xl font-semibold">Замовлення</h2>
                            <ul className="space-y-3">
                                <li>
                                    <div className="text-base font-medium flex justify-between">
                                        <div>Товар на суму</div>
                                        <div>₴{itemsPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className=" flex justify-between">
                                        <div>Податки</div>
                                        <div>₴{taxPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className=" flex justify-between">
                                        <div>Доставка</div>
                                        <div>₴{shippingPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className=" flex justify-between">
                                        <div>Загалом</div>
                                        <div>₴{totalPrice}</div>
                                    </div>
                                </li>
                                {!isPaid && paymentMethod === 'PayPal' && (
                                    <li>
                                        <PayPalScriptProvider
                                            options={{clientId: paypalClientId}}
                                        >
                                            <PayPalButtons
                                                createOrder={createPayPalOrder}
                                                onApprove={onApprovePayPalOrder}
                                            />
                                        </PayPalScriptProvider>
                                    </li>
                                )}
                                {session?.user.isAdmin && (
                                    <li>
                                        <Button
                                            onClick={() => deliverOrder()}
                                            disabled={isDelivering}
                                        >
                                            {isDelivering && (
                                                <span className="loading loading-spinner"></span>
                                            )}
                                            Позначити як доставлене
                                        </Button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
