import { ProductCardSkeleton } from '@/components/product/product-card-skeleton';
import React from 'react';

const Loading = () => {
  return (
    <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default Loading;
