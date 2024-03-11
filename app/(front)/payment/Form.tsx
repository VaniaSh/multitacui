'use client'
import CheckoutSteps from '@/components/CheckoutSteps'
import useCartService from '@/lib/hooks/useCartStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {Button} from "@/components/ui/button";

const Form = () => {
  const router = useRouter()
  const { savePaymentMethod, paymentMethod, shippingAddress } = useCartService()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    savePaymentMethod(selectedPaymentMethod)
    router.push('/place-order')
  }

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping')
    }
    setSelectedPaymentMethod(paymentMethod || 'PayPal')
  }, [paymentMethod, router, shippingAddress.address])

  return (
    <div>
      <CheckoutSteps current={2} />
      <div className="max-w-screen-2xl mx-auto my-4 px-5">
        <div className="w-full md:w-1/3 mx-auto bg-primary-foreground rounded-lg p-4 my-4 border-secondary border">
          <h1 className="text-2xl font-semibold leading-none mb-4">Метод оплати</h1>
          <form onSubmit={handleSubmit}>
            {['PayPal', 'Оплата онлайн на ФОП', 'Оплата при отриманні'].map((payment) => (
              <div key={payment} className="hover:bg-secondary px-4 rounded-md">
                <label className="flex justify-between gap-x-10 items-center cursor-pointer">
                  <span className="text-base leading-10 font-normal">{payment}</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    className="w-3 h-3 rounded-full checked: bg-primary"
                    value={payment}
                    checked={selectedPaymentMethod === payment}
                    onChange={() => setSelectedPaymentMethod(payment)}
                  />
                </label>
              </div>
            ))}
            <div className="flex gap-x-4 mt-10 items-center justify-center">
              <Button type="submit">
                Далі
              </Button>
              <Button
                  type="button"
                  onClick={() => router.back()}
              >
                Назад
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Form
