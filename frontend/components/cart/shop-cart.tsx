/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';
import CartCard from '../ui/cart-card';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { CartButtonSkeleton } from './cart-button-skeleton';



const ShopCart = () => {

    const [open, setOpen] = useState(false);


    const { totalPrice, cartItems, totalItems, cartId, isLoading } = useCart();
    // if (isLoading) return <CartButtonSkeleton />


    return (
        <Sheet onOpenChange={setOpen} >
            <SheetTrigger asChild>

                {isLoading ? <CartButtonSkeleton /> :
                    <Button
                        size="icon"
                        variant="ghost"
                        className="relative cursor-pointer"
                        aria-label="Cart"
                    >
                        <p className="absolute -right-2 -top-2 size-4 flex items-center justify-center rounded-full bg-rose-600 text-[10px] text-white">
                            {totalItems}
                        </p>
                        <ShoppingCart size={20} />
                    </Button>
                }
            </SheetTrigger>

            <SheetContent className="w-[500px] h-screen  overflow-y-auto" >
                <SheetHeader className='my-0'>
                    <SheetTitle className="text-3xl">Your Cart</SheetTitle>
                    <div className='flex justify-between items-center mt-2'>

                        <h2 className="text-lg font-medium">Items {cartItems.length}</h2>
                        <h2 className="text-lg text-foreground font-semibold">
                            Total: {totalPrice} DH
                        </h2>
                    </div>
                </SheetHeader>

                <div className="grid grid-cols-1 gap-3 px-2">
                    {cartItems.map(item => (
                        <CartCard key={item.id} cartItem={item} />
                    ))}
                </div>


                {cartItems.length === 0 ? <h1 className=' text-xl text-foreground/30  flex  justify-center items-center h-2/3  '>Your cart is empty</h1>
                    : <SheetFooter>
                        <SheetClose asChild>
                            <Button asChild disabled={!cartId}>

                                <Link href={`/checkout/${cartId}`}>Checkout</Link>
                            </Button>
                        </SheetClose>
                    </SheetFooter>}

            </SheetContent>
        </Sheet>
    );
};

export default ShopCart;
