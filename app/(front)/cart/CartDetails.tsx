'use client'

import useCartService from '@/lib/hooks/useCartStore'
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import React, {useEffect, useState} from 'react'
import {Button} from "@/components/ui/button";

export default function CartDetails() {
    const router = useRouter()
    const {items, itemsPrice, decrease, increase} = useCartService()

    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <></>

    return (
        <>
            {items.length === 0 ? (
                <div className="w-full text-center font-bold text-2xl mt-20 md:mt-52">
                    <h1>Корзина порожня</h1>
                    <Link className="mt-5" href="/"><Button>
                        До покупок
                    </Button></Link>
                </div>
            ) : (
                <section className="flex items-center w-full mt-8 font-poppins">
                    <div className="justify-center flex-1 px-4 mx-auto max-w-screen-2xl lg:py-4 md:px-6">
                        <div className="p-8 bg-gray-50 dark:bg-gray-800">
                            <h2 className="mb-8 text-4xl font-bold dark:text-gray-400">Ваша корзина</h2>
                            <div className="flex flex-wrap -mx-4">
                                <div className="w-full px-4 mb-8 xl:w-8/12 xl:mb-0">
                                    <div className="flex flex-wrap items-center mb-6 -mx-4 md:mb-8">
                                        <div className="w-full md:block hidden px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                                            <h2 className="font-bold text-gray-500 dark:text-gray-400">Назва</h2>
                                        </div>
                                        <div className="hidden px-4 lg:block lg:w-2/12">
                                            <h2 className="font-bold text-gray-500 dark:text-gray-400">Ціна</h2>
                                        </div>
                                        <div className="hidden md:block px-4 md:w-1/6 lg:w-2/12 ">
                                            <h2 className="font-bold text-gray-500 dark:text-gray-400">Кількість</h2>
                                        </div>
                                        <div className="hidden md:block px-4 text-right md:w-1/6 lg:w-2/12 ">
                                            <h2 className="font-bold text-gray-500 dark:text-gray-400">Загалом</h2>
                                        </div>
                                    </div>
                                    {
                                        items.map((item, key) => (
                                            <div key={key}
                                                 className="py-2 mb-4 border-t border-b border-gray-200 dark:border-gray-700">
                                                <div className="flex flex-wrap items-center mb-6 -mx-4 md:mb-8">
                                                    <div className="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                                                        <div className="flex flex-wrap items-center -mx-4">
                                                            <div className="w-full px-4 mb-3 md:w-1/3">
                                                                <div className="w-full h-96 md:h-24 md:w-24 relative">
                                                                    <Link
                                                                        href={`/product/${item.slug}`}
                                                                        className="flex items-center"
                                                                    >
                                                                        <Image
                                                                            src={item.image}
                                                                            alt={item.name}
                                                                            objectFit={'cover'}
                                                                            fill
                                                                        ></Image>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                            <div className="w-2/3 px-4">
                                                                <h2 className="mb-2 text-xl font-bold dark:text-gray-400">{item.name}</h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="hidden px-4 lg:block lg:w-2/12">
                                                        <p className="text-lg font-bold text-primary dark:text-gray-400">{item.price}₴</p>
                                                        <span
                                                            className="text-xs text-gray-500 line-through dark:text-gray-400">{item.price * 1.4}₴</span>
                                                    </div>
                                                    <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
                                                        <div
                                                            className="inline-flex items-center px-4 font-semibold text-gray-500 border border-gray-200 rounded-md dark:border-gray-700 ">
                                                            <Button className="mr-1" size={'icon'} variant={"ghost"}
                                                                    onClick={() => decrease(item)}> - </Button>
                                                            <span>{item.qty}</span>
                                                            <Button className="ml-1" size={'icon'} variant={"ghost"}
                                                                    onClick={() => increase(item)}> + </Button>

                                                        </div>
                                                    </div>
                                                    <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 ">
                                                        <p className="text-lg font-bold text-primary dark:text-gray-400">{item.price * item.qty}₴</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="w-full px-4 xl:w-4/12">
                                    <div
                                        className="p-6 border border-gray-400 dark:bg-gray-900 dark:border-gray-900 bg-gray-100 rounded-md md:p-8">
                                        <h2 className="mb-8 text-3xl font-bold text-gray-700 dark:text-gray-400">Ваше
                                            замовлення</h2>
                                        <div
                                            className="flex items-center justify-between pb-4 mb-4 border-b border-gray-300 dark:border-gray-700 ">
                                            <span className="text-gray-700 dark:text-gray-400">Проміжний підсумок</span>
                                            <span
                                                className="text-xl font-normal text-gray-700 dark:text-gray-400">({items.reduce((a, c) => a + c.qty, 0)}) : ₴
                                                {itemsPrice}</span>
                                        </div>
                                        <div className="flex items-center justify-between pb-4 mb-4 ">
                                            <span className="text-gray-700 dark:text-gray-400 ">Доставка</span>
                                            <span className="text-sm font-light text-gray-700 dark:text-gray-400 ">за тарифами перевізника</span>
                                        </div>
                                        <div className="flex items-center justify-between pb-4 mb-4 ">
                                            <span className="text-gray-700 dark:text-gray-400">Загалом</span>
                                            <span
                                                className="text-xl font-bold text-gray-700 dark:text-gray-400">({items.reduce((a, c) => a + c.qty, 0)}) : ₴
                                                {itemsPrice}</span>
                                        </div>
                                        <div className="flex items-center justify-between ">
                                            <Button
                                                variant={"default"}
                                                size={'lg'}
                                                onClick={() => router.push('/shipping')}
                                            >Оформити замовлення
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}
