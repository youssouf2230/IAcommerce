'use client';

import { products } from '@/components/data/products';
import ProductCard from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select ,SelectContent,SelectItem,SelectTrigger,SelectValue  } from '@/components/ui/select';
import { Funnel, Search } from 'lucide-react';
import React from 'react';

const ShopPage = () => {
  return (
    <main className="py-10 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="w-4xl m-auto relative group  mx-auto mb-10 text-center ">
      <Input placeholder='search' className='p-5.5 pr-10 border-foreground/40 '></Input>
      <Search className='absolute right-3 top-3 text-muted-foreground  group-hover:text-primary  transition-colors' size={22}/>
      </div>

      {/* Filter Placeholder (optional) */}
      <div className='flex gap-5 my-10 '>
      <div>
        {/* Future: Sorting dropdown or filters */}
         <Button className='py-6 rounded-xl'>
          <Funnel size={20}/> Filter
         </Button>
      </div>
      <div>
        {/* Future: Sorting dropdown or filters */}
        <Select>
            <SelectTrigger className='w-50 py-6 rounded-xl'>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="priceLowHigh">Price: Low to High</SelectItem>
              <SelectItem value="priceHighLow">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
            </SelectContent>
          </Select>
      </div>
      <div>
        {/* Future: Sorting dropdown or filters */}
         <Select>
            <SelectTrigger className='w-50 py-6 rounded-xl'>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="priceLowHigh">Price: Low to High</SelectItem>
              <SelectItem value="priceHighLow">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
            </SelectContent>
          </Select>
      </div>
      <div>
        {/* Future: Sorting dropdown or filters */}
         <Select>
            <SelectTrigger className='w-50 py-6 rounded-xl'>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="priceLowHigh">Price: Low to High</SelectItem>
              <SelectItem value="priceHighLow">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
            </SelectContent>
          </Select>
      </div>

      </div>

      {/* Products Grid */}
      <div className=" mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </main>
  );
};

export default ShopPage;
