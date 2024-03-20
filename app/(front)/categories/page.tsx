import React from 'react';
import productServices from '@/lib/services/productService';
import Link from "next/link";
import Image from "next/image";

const Page: React.FC = async () => {
    const allCategories = await productServices.getCategories();

    const productsPromises = allCategories.map(category => productServices.getByCategory(category));
    const allProducts = await Promise.all(productsPromises);

    return (
        <div className="w-full">
            {allCategories.map((category, index) => (
                <div className="p-3" key={index}>
                    <h2 className="text-2xl text-primary mb-4">{category}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {allProducts[index].map((product, productIndex) => (
                                <div
                                    key={productIndex}
                                    className="w-[328px] bg-primary-foreground shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                                    <Link href={`/product/${product.slug}`}>
                                        <Image
                                            width={328}
                                            height={320}
                                            src={product.image}
                                            alt="Product" className="h-80 w-[328px] object-cover rounded-t-xl"/>
                                        <div className="px-4 py-3 w-72">
                                            <span className="text-gray-400 mr-3 uppercase text-xs">{product.brand || 'Multitac'}</span>
                                            <p className="text-lg font-bold text-primary truncate block capitalize">{product.name}</p>
                                            <div className="flex items-center">
                                                <p className="text-lg font-semibold text-primary cursor-auto my-3">{product.price}₴</p>
                                                <del>
                                                    <p className="text-sm text-primary/80 cursor-auto ml-2">{(product.price * 1.1).toFixed(1)}₴</p>
                                                </del>
                                                <div className="ml-auto">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                         fill="currentColor" className="bi bi-bag-plus"
                                                         viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd"
                                                              d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"/>
                                                        <path
                                                            d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Page;
