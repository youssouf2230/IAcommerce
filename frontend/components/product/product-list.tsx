// app/shop/product-list.tsx
import PaginationShop from '@/components/shop/pagination-shop';
import { getProducts } from '@/actions/product-actions';
import ProductCard from '@/components/product/product-card';

type ProductListProps = {
  page: number;
  size: number;
  search: string;
  sort: string;
};

// This is an async Server Component. It fetches its own data.
export async function ProductList({ page, size, search, sort }: ProductListProps) {
  
  const productData = await getProducts(page, size, search, sort);

  const products = productData.content;
  const totalPages = productData.totalPages;
  const currentPage = productData.number;

  if (!products || products.length === 0) {
    return (
      <p className="col-span-full text-center text-muted-foreground">
        No products found matching your criteria.
      </p>
    );
  }

  return (
    <>
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
      
          />
        ))}
      </div>

      <div className="mt-12">
        <PaginationShop
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}