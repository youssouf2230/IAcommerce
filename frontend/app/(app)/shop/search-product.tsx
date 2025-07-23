// components/shop/SearchProduct.tsx

'use client';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// It is highly recommended to use a dedicated debounce library for React.
// npm install use-debounce
import { useDebouncedCallback } from 'use-debounce';

const SearchProduct = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Using a hook like useDebouncedCallback is more efficient in React.
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
   
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="w-full max-w-4xl mx-auto mb-10 text-center relative group">
      <Input
        placeholder="Search for products..."
        className="p-5.5 pr-10 border-foreground/40"
        onChange={(e) => handleSearch(e.target.value)}
        // THE FIX: Set the default value from the URL's search parameters.
        // This keeps the input's visual state in sync with the URL.
        defaultValue={searchParams.get('search')?.toString() || ''}
      />
      <Search
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors"
        size={22}
      />
    </div>
  );
};

export default SearchProduct;