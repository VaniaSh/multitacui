import React, {FC} from 'react';
import productServices from '@/lib/services/productService'

type PageProps = {};

const Page: FC<PageProps> = async({}) => {
    const categories = await productServices.getCategories()

    console.log(categories, 'categories')
    return (
        <div className="">
            Categories
        </div>
    );
};
export default Page
