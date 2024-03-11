import React from 'react';
import productServices from '@/lib/services/productService';

const Page: React.FC = async () => {
    // Fetch all categories
    const allCategories = await productServices.getCategories();

    // Fetch products for each category concurrently
    const productsPromises = allCategories.map(category => productServices.getByCategory(category));
    const allProducts = await Promise.all(productsPromises);

    // Display category names and product names on the screen
    return (
        <div>
            {allCategories.map((category, index) => (
                <div key={index}>
                    <h2 className="text-destructive">{category}</h2>
                    <ul>
                        {allProducts[index].map((product, productIndex) => (
                            <li key={productIndex}>{product.name}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Page;
