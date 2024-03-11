'use client'
import CheckoutSteps from '@/components/CheckoutSteps'
import useCartService from '@/lib/hooks/useCartStore'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useSWRMutation from 'swr/mutation'
import Image from 'next/image'
import {Button} from "@/components/ui/button";

const Form = () => {
  const router = useRouter()
  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    clear,
  } = useCartService()

  const { trigger: placeOrder, isMutating: isPlacing } = useSWRMutation(
    `/api/orders/mine`,
    async (url) => {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethod,
          shippingAddress,
          items,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        }),
      })
      const data = await res.json()
      console.log(data, 'data')
      if (res.ok) {
        clear()
        toast.success('Замовлення успішно сформовано')
        return router.push(`/order/${data.order._id}`)
      } else {
        toast.error(data.message)
      }
    }
  )
  useEffect(() => {
    if (!paymentMethod) {
      return router.push('/payment')
    }
    if (items.length === 0) {
      return router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod, router])

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  console.log(items, 'items')
  console.log(itemsPrice, 'items')
  if (!mounted) return <></>

  return (
    <div>
      <CheckoutSteps current={4} />
      <div className="max-w-screen-2xl mx-auto grid md:grid-cols-4 md:gap-5 my-4 px-5">
        <div className="overflow-x-auto md:col-span-3 px-5">
          <div className="bg-primary-foreground">
            <div className="border border-secondary p-5">
              <h2 className="text-xl font-semibold mb-1">Адреса доставки та дані отримувача</h2>
              <p className="text-base font-semibold">{shippingAddress.fullName}</p>
              <p>
                {shippingAddress.address}, {shippingAddress.city},{' '}
              </p>
              <div className="mt-3">
                <Link className="btn" href="/shipping">
                  <Button variant={'outline'}>Редагувати</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-primary-foreground mt-4">
            <div className="border border-secondary p-5">
              <h2 className="text-xl font-semibold mb-1">Метод оплати</h2>
              <p>{paymentMethod}</p>
              <div className="mt-3">
                <Link className="btn" href="/payment">
                  <Button variant={'outline'}>Редагувати</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-primary-foreground mt-4">
            <div className="border border-secondary p-5 overflow-auto">
              <h2 className="text-xl font-semibold mb-1">Ваше замовлення</h2>
              <table className="w-full min-w-[500px] overflow-auto">
                <thead>
                  <tr>
                    <th className="text-left font-light">Зображення</th>
                    <th className="text-left font-light">Назва товару</th>
                    <th className="text-left font-light">Кількість</th>
                    <th className="text-left font-light">Ціна</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
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
                        <span className="px-1">
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
              <div>
                <Link className="btn" href="/cart">
                  <Button variant={'outline'}>Редагувати</Button>
                </Link>
              </div>
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

                <li>
                  <Button
                    onClick={() => placeOrder()}
                    disabled={isPlacing}
                    variant="default"
                  >
                    {isPlacing && (
                      <span className="loading loading-spinner"></span>
                    )}
                    Підтвердити замовелення
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Form
