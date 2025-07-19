import React from 'react';
import SectionLayout from '../layout/section-layout';
import ProductCard from '../product/product-card';
import { products } from '../data/products';
import { useTranslations } from 'next-intl';

const FeaturesProducts = () => {
  const t = useTranslations('FeaturesProducts');


    return (
        <SectionLayout title={t('title')} description={t('description')}>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {products.map((product, index) => (
                    
                    <ProductCard key={index} {...product} />
                ))}
            </div>
        </SectionLayout>
    );
};

export default FeaturesProducts;
