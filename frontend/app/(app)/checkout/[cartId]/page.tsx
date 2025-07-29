'use client';

import React, { use, useEffect, useState } from 'react';
import { Cart } from '@/types';
import CartCard from '@/components/ui/cart-card';
import { AdditionalInfoForm } from './AdditionalInfoForm';

const Page = ({ params }: { params: Promise<{ cartId: string }> }) => {
    const { cartId } = use(params);

    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/cart/${cartId}`, {
                    credentials: 'include',
                    cache: 'no-store',
                });

                if (!res.ok) {
                    throw new Error('Erreur lors du chargement du panier.');
                }

                const data = await res.json();
                setCart(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [cartId]);

    if (loading) return <div className="p-8">Chargement...</div>;
    if (error || !cart) return <div className="p-8 text-red-500">{error || 'Erreur inconnue'}</div>;

    return (
        <div className='p-8'>
            <h1 className='text-3xl font-semibold my-10'>Checkout</h1>
            <div className='flex md:flex-row flex-col max-md:gap-10'>
                <div className='flex-1 flex-col space-y-4'>
                    {cart.items.length === 0 ? (
                        <div className="p-8 text-red-500">Aucun produit dans le panier</div>
                    ) : (
                        cart.items.map(item => (
                            <CartCard key={item.id} cartItem={item} fetchCart={() => {}} />
                        ))
                    )}
                </div>

                {cart.items.length > 0 && (
                    <div className='flex-1'>
                        <div className='sticky top-10 m-auto'>
                            <AdditionalInfoForm cartId={cartId} />
                            <h1 className='text-3xl font-bold px-10 w-full flex justify-end'>
                                Total : {
                                cart.items
                                    .reduce((sum, item) => sum + item.quantity * item.product.sellPrice, 0)
                                    .toFixed(2)
                            } DH
                            </h1>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
