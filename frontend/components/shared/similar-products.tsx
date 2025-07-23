import React from 'react';
import CarouselProducts from './carousel-products';
import { Product } from '../types';

const SimilarProducts = async ({id}:{id:number}) => {
  const res = await fetch('http://localhost:8080/api/products/similar/'+id, {
    next: { revalidate: 60 }, 
  });

  if (!res.ok) {
    throw new Error('Failed to fetch similar products');
  }

  const products: Product[] = await res.json();

  return (
    <div className='relative w-full md:p-10 lg:p-20'>
        <h1 className='text-3xl font-medium my-10'>Similar Products</h1>
        <div  className='max-md:p-10'>
            
      <CarouselProducts  products={products} />
        </div>
    </div>
  );
};

export default SimilarProducts;
