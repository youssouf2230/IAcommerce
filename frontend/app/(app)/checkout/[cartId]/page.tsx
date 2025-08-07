'use client';

import React, { use } from 'react';
import CartCard from '@/components/ui/cart-card';
import { AdditionalInfoForm } from './AdditionalInfoForm';

import { useCart } from '@/hooks/use-cart';
import {  useRouter } from 'next/navigation';


const Page = ({ params }: { params: Promise<{ cardIdParam: string }> }) => {
    const router = useRouter()
    const { cardIdParam } = use(params);
    const { cartItems,cartId  } = useCart()
     if(!cartId){
        router.back()
     }

    return (
        <div className='p-8'>
            <h1 className='text-3xl font-semibold my-10'>Checkout</h1>
            <div className='flex md:flex-row flex-col max-md:gap-10'>
                <div className='flex-1 flex-col space-y-4'>
                   
                     {cartItems.map(item => (
                        <CartCard key={item.id} cartItem={item} />
                    ))}
                </div>

                {cartItems.length > 0 && (
                    <div className='flex-1'>
                        <div className='sticky top-24 m-auto'>
                            <AdditionalInfoForm cartId={cartId?.toString() as string} />
                            <h1 className='text-3xl font-bold px-10 w-full flex justify-end'>
                                Total : {
                                    cartItems
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
