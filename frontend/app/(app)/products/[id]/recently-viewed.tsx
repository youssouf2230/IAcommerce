'use client';

import CarouselProducts from '@/components/shared/carousel-products';
import { Product } from '@/types';
import React, { useEffect, useState } from 'react';

const RecentlyViewed = ({ product }: { product: Product }) => {
    const [products, setProducts] = useState<Product[]>([]);

    const storageKey = 'recentlyViewedProducts';

    const addToRecentlyViewed = (product: Product) => {
        let visited: Product[] = [];

        try {
            const stored = localStorage.getItem(storageKey);
            if (stored) {
                visited = JSON.parse(stored) || [];
            }
        } catch (error) {
            console.error('Error parsing recently viewed products:', error);
            visited = [];
        }

        visited = visited.filter((p) => p.id !== product.id);


        if (visited.length >= 5) {
            visited.shift();
        }

        visited.push(product);
        localStorage.setItem(storageKey, JSON.stringify(visited));
    };

    useEffect(() => {
        if (!product) return;

        addToRecentlyViewed(product);

        const stored = localStorage.getItem(storageKey);
        if (stored) {
            try {
                const filterProducts = JSON.parse(stored).filter((p: Product) => p.id !== product.id);
                setProducts(filterProducts);
            } catch (e) {
                console.error('Error loading recently viewed products:', e);
                setProducts([]);
            }
        }
    }, [product]);

    if (products.length === 0) return null;

    return (
        <div className="relative w-full md:p-10 lg:p-20">
            <h1 className="text-3xl font-medium my-10">Recently Viewed</h1>
            <div className="max-md:p-10">
                <CarouselProducts products={products} />
            </div>
        </div>
    );
};

export default RecentlyViewed;
