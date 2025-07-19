import React from 'react';
import SectionLayout from '../layout/section-layout';
import ProductCard from '../product/product-card';
import { products } from '../data/products';

const FeaturesProducts = () => {
 


    return (
        <SectionLayout title='Featured Products' description='Discover our best-selling accessories crafted for comfort, style, and performance.'>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {products.map((product, index) => (
                    
                    <ProductCard key={index} {...product} />
                ))}
            </div>
        </SectionLayout>
    );
};

export default FeaturesProducts;
