'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const Sorting = () => {
    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSort = (sortValue: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '0'); // Reset to first page on sort change
        if (sortValue) {
            params.set('sort', sortValue);
        } else {
            params.delete('sort');
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div>
            {/* Future: Sorting dropdown or filters */}
           <Select onValueChange={handleSort} defaultValue={searchParams.get('sort')?.toString()}>
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
    );
}

export default Sorting;
