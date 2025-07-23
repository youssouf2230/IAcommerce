'use client';

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import ProductCard from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Funnel, Search } from 'lucide-react';

// Types
export type Product = {
    id: number;
    name: string;
    sellPrice: number;
    oldPrice: number;
    rating: number;
    imageUrls: string[];   // <-- remplace colors par imageUrls
    hasLiked: boolean;
};

const PAGE_SIZE = 8;

const ShopPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('none'); // "none" par défaut
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    // Debounce search
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearch(search), 500);
        return () => clearTimeout(handler);
    }, [search]);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const appliedSort = sort === 'none' ? '' : sort;
            const res = await axios.get('http://localhost:8080/api/products/all-products', {
                params: {
                    search: debouncedSearch,
                    sort: appliedSort,
                    page,
                    size: PAGE_SIZE,
                },
            });

            const data = res.data;
            setProducts(data.content || []);
            setTotalPages(data.totalPages || 1);
        } catch (error) {
            console.error('Erreur chargement produits:', error);
            setProducts([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    }, [debouncedSearch, sort, page]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        setPage(0);
    }, [debouncedSearch, sort]);

    return (
        <main className="py-10 px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="w-4xl m-auto relative group mx-auto mb-10 text-center">
                <Input
                    placeholder="search"
                    className="p-5.5 pr-10 border-foreground/40"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Search
                    className="absolute right-3 top-3 text-muted-foreground group-hover:text-primary transition-colors"
                    size={22}
                />
            </div>

            {/* Filter Placeholder */}
            <div className="flex gap-5 my-10 ">
                <div>
                    <Button className="py-6 rounded-xl">
                        <Funnel size={20} /> Filter
                    </Button>
                </div>

                <div>
                    <Select value={sort} onValueChange={(val) => setSort(val)}>
                        <SelectTrigger className="w-50 py-6 rounded-xl">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="priceLowHigh">Price: Low to High</SelectItem>
                            <SelectItem value="priceHighLow">Price: High to Low</SelectItem>
                            <SelectItem value="rating">Top Rated</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Si tu as plusieurs filtres similaires, conserve-les sinon tu peux les nettoyer */}
            </div>

            {/* Products Grid */}
            <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {loading ? (
                    <p className="text-center col-span-full">Loading products...</p>
                ) : products.length === 0 ? (
                    <p className="text-center col-span-full">No products found.</p>
                ) : (
                    products.map((product: Product) => {
                        const imageUrl = product.imageUrls?.[0] || '/default.png'; // <-- ici
                        return (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.sellPrice.toFixed(2) + ' DH'}
                                oldPrice={product.oldPrice.toFixed(2) + ' DH'}
                                rating={product.rating}
                                imageUrl={imageUrl}
                                initialHasLiked={product.hasLiked}
                            />
                        );
                    })
                )}
            </div>

            {/* Pagination simple */}
            <div className="flex justify-center gap-5 mt-10">
                <Button disabled={page <= 0} onClick={() => setPage((p) => Math.max(p - 1, 0))}>
                    Previous
                </Button>
                <span className="self-center">
                    Page {page + 1} / {totalPages}
                </span>
                <Button
                    disabled={page + 1 >= totalPages}
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
                >
                    Next
                </Button>
            </div>
        </main>
    );
};

export default ShopPage;
