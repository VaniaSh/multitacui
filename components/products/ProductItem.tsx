import {Product} from '@/lib/models/ProductModel'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {Rating} from './Rating'
import {Button} from "@/components/ui/button";
import AddToCart from "@/components/products/AddToCart";
import {convertDocToObj} from "@/lib/utils";

export default function ProductItem({product}: { product: Product }) {
    const trimmedDescription =
        product.description.length > 100
            ? `${product.description.slice(0, 100)}...`
            : product.description;
    return (
        <section
            className="p-5 py-6 bg-zinc-500/10 text-center transform duration-500 hover:-translate-y-2 cursor-pointer rounded-md">
            <Link href={`/product/${product.slug}`}>
                <Image src={product.image} alt={product.name} width={400} height={400}/>
                <div className="space-x-1 flex justify-center">
                </div>
                <h1 className="text-3xl text-primary my-5">{product.name}</h1>
                <h2 className="font-semibold mb-5">{product.price} ₴</h2>
            </Link>
            <AddToCart
                item={{
                    ...convertDocToObj(product),
                    qty: 0,
                    color: '',
                    size: '',
                }}
            />
        </section>
    )
}
