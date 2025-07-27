// components/product/product-card-skeleton.tsx

import { Skeleton } from '@/components/ui/skeleton';

export const ProductCardSkeleton = () => {
  return (
    <div className="p-6 relative bg-white rounded-lg">
      <Skeleton className="aspect-square w-full" />
      <Skeleton className="h-6 w-3/4 mt-3" />
      <Skeleton className="h-5 w-1/2 mt-2" />
      <Skeleton className="h-6 w-1/3 mt-3" />
      <Skeleton className="h-12 w-full mt-4" />
    </div>
  );
};