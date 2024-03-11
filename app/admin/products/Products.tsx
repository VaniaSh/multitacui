'use client'
import {Product} from '@/lib/models/ProductModel'
import {formatId} from '@/lib/utils'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import {Button} from "@/components/ui/button";
import {HiOutlineMenuAlt2} from "react-icons/hi";
import React from "react";
import {DotsHorizontalIcon} from "@radix-ui/react-icons";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

export default function Products() {
    const {data: products, error} = useSWR(`/api/admin/products`)

    const router = useRouter()

    const {trigger: deleteProduct} = useSWRMutation(
        `/api/admin/products`,
        async (url, {arg}: { arg: { productId: string } }) => {
            const toastId = toast.loading('Deleting product...')
            const res = await fetch(`${url}/${arg.productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await res.json()
            res.ok
                ? toast.success('Товар видаленно', {
                    id: toastId,
                })
                : toast.error(data.message, {
                    id: toastId,
                })
        }
    )

    const {trigger: createProduct, isMutating: isCreating} = useSWRMutation(
        `/api/admin/products`,
        async (url) => {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await res.json()
            if (!res.ok) return toast.error(data.message)

            toast.success('Product created successfully')
            router.push(`/admin/products/${data.product._id}`)
        }
    )

    if (error) return 'An error has occurred.'
    if (!products) return 'Завантаження...'

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="py-4 text-2xl">Товари</h1>
                <Button
                    disabled={isCreating}
                    onClick={() => createProduct()}
                >
                    {isCreating && <span className="loading loading-spinner"></span>}
                    Додати новий товар
                </Button>
            </div>

            <div className="max-w-screen-2xl mx-auto">
                <table className="w-full">
                    <thead className='p-3'>
                    <tr className="text-left bg-secondary">
                        <th className="p-3">id</th>
                        <th className="p-3">Назва</th>
                        <th className="p-3">Ціна</th>
                        <th className="p-3">Категорія</th>
                        <th className="p-3">Загальна кількість</th>
                        <th className="p-3">Дії</th>
                    </tr>
                    </thead>
                    <tbody className="bg-primary-foreground">
                    {products.map((product: Product) => (
                        <tr key={product._id}>
                            <td className="p-3">{formatId(product._id!)}</td>
                            <td className="p-3">{product.name}</td>
                            <td className="p-3">${product.price}</td>
                            <td className="p-3">{product.category}</td>
                            <td className="p-3">{product.countInStock}</td>
                            <td className="p-3">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <DotsHorizontalIcon className="w-5 h-5"/>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-40">
                                        <DropdownMenuItem>
                                            <Button
                                                className="w-full"
                                                variant={"outline"}>
                                                <Link
                                                    href={`/admin/products/${product._id}`}
                                                >
                                                Редагувати
                                                </Link>
                                            </Button>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem><Button
                                            className="w-full"
                                            variant={'destructive'}
                                            onClick={() => deleteProduct({productId: product._id!})}
                                            type="button"
                                        >
                                            Видалити
                                        </Button></DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
