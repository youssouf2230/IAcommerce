// app/shop/page.tsx (or wherever this file is)

import { getProducts } from '@/app/actions/product-actions';
import ProductCard from '@/components/product/product-card';
import SearchProduct from './search-product';
import Sorting from './sorting';
import Filter from './filter';
import PaginationShop from './pagination-shop';
import { Suspense } from 'react';

type ShopPageProps = {
  searchParams?: {
    page?: string;
    size?: string;
    search?: string;
    sort?: string;
  };
}

const ShopPage = async ({ searchParams }: ShopPageProps) => {
  const search_params = await searchParams
  const page = Number(search_params?.page) || 0;
  const size = Number(search_params?.size) || 4;
  const search = search_params?.search || '';
  const sort = search_params?.sort || '';

  const productData = await getProducts(page, size, search, sort);

  const products = productData.content;
  const totalPages = productData.totalPages;
  const currentPage = productData.number;

  return (
    <main className="py-10 px-4 sm:px-6 lg:px-8">
      <SearchProduct />

      <div className="flex flex-wrap gap-5 my-10">
        <Filter />
        <Sorting />
      </div>

      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Suspense fallback={<p>Loading...</p>}>

          {products && products.length > 0 ? (
            products.map((product) => (

              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground">
              No products found matching your criteria.
            </p>
          )}
        </Suspense>
      </div>


      <div className="mt-12">
        <PaginationShop
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </main>
  );
};

export default ShopPage;