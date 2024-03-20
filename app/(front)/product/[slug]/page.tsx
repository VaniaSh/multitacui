import AddToCart from '@/components/products/AddToCart'
import {convertDocToObj} from '@/lib/utils'
import productService from '@/lib/services/productService'
import Image from 'next/image'
import Link from 'next/link'
import {Button} from "@/components/ui/button";
import {MdKeyboardArrowLeft} from "react-icons/md";

export async function generateMetadata({
                                           params,
                                       }: {
    params: { slug: string }
}) {
    const product = await productService.getBySlug(params.slug)
    if (!product) {
        return {title: 'Product not found'}
    }
    return {
        title: product.name,
        description: product.description,
    }
}

export default async function ProductDetails({
                                                 params,
                                             }: {
    params: { slug: string }
}) {
    const product = await productService.getBySlug(params.slug)
    if (!product) {
        return <div>Схоже цей продукт був видалений</div>
    }
    return (
        <div className="mt-3 w-full">
            <Link className="font-semibold tracking-widest flex items-center w-full" href={'/'}><MdKeyboardArrowLeft
                size={20}/>Назад на головну
            </Link>
            <div className="py-8 w-full">
                <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row -mx-4">
                        <div className="md:flex-1 px-4">
                            <div className="h-[460px] rounded-lg bg-zinc-500/10 mb-4 relative">
                                <Image fill objectFit="contain"
                                       src={product.image}
                                       alt={product.name}/>
                            </div>
                        </div>
                        <div className="md:flex-1 px-4">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{product.name}</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet blanditiis commodi
                                corporis enim explicabo hic illo iusto, magni natus odio optio praesentium ratione
                                reiciendis rem tempora, unde ut veritatis vero.
                            </p>
                            <div className="flex flex-col gap-y-4 mb-4">
                                <div className="mr-4">
                                    <span
                                        className="text-gray-600 font-semibold ml-4 text-3xl dark:text-gray-300">{product.price} ₴</span>
                                </div>
                                <div>
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Наявність: </span>
                                    <span className="text-gray-600 dark:text-gray-300">В наявності</span>
                                </div>
                            </div>
                            <div className="mb-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Оберіть коріл</span>
                                <div className="flex items-center mt-2">
                                    {product && product.colors && product.colors.split(',').map((color, index) => (
                                        <button
                                            style={{backgroundColor: color}}
                                            key={index}
                                            className="w-6 h-6 rounded-full mr-2"/>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Оберіть Розмір</span>
                                <div className="flex gap-x-3 items-center mt-2">
                                    {product && product.sizes && product.sizes.split(',').map((size, index) => (
                                        <Button
                                            key={index}
                                            size={"icon"}>
                                            {size}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-x-2 mb-4">
                                <AddToCart
                                    item={{
                                        ...convertDocToObj(product),
                                        qty: 0,
                                        color: 'S',
                                        size: 'M',
                                    }}
                                />
                                <Button
                                    variant={'outline'}
                                >
                                    Додати до списку бажань
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col -mx-2 mb-4">
                        <div className="font-bold text-gray-700 dark:text-gray-300">Опис Товару:</div>
                        <div className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                            {product.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
