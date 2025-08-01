// app/shop/page.tsx

import SearchProduct from '../../../components/shop/search-product';
import Sorting from '../../../components/shop/sorting';
import Filter from '../../../components/shop/filter';
import { Suspense } from 'react';
import { ProductCardSkeleton } from '@/components/product/product-card-skeleton';
import { ProductList } from '@/components/product/product-list';

type ShopPageProps = {
  searchParams?: {
    page?: string;
    size?: string;
    search?: string;
    sort?: string;
  };
};

// This is the main page component. It remains a Server Component.
const ShopPage = ({ searchParams }: ShopPageProps) => {
  // We keep searchParams handling here to pass them down
  const page = Number(searchParams?.page) || 0;
  const size = Number(searchParams?.size) || 4;
  const search = searchParams?.search || '';
  const sort = searchParams?.sort || '';

  // This key forces the Suspense boundary to re-render on navigation,
  // showing the fallback state again.
  const key = `${page}-${size}-${search}-${sort}`;

  return (
    <main className="py-10 px-4 sm:px-6 lg:px-8">
      <SearchProduct />

      <div className="flex flex-wrap gap-5 my-10">
        <Filter />
        <Sorting />
      </div>

      {/* Added for accessibility: provides structure for the product section */}
      <h2 className="sr-only">Product List</h2>

      <Suspense  key={key}
        fallback={
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Render skeleton loaders matching the 'size' parameter */}
            {Array.from({ length: size }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        {/* We move data fetching and mapping into this new component */}
        <ProductList
          page={page}
          size={size}
          search={search}
          sort={sort}
        />
      </Suspense>
    </main>
  );
};

export default ShopPage;