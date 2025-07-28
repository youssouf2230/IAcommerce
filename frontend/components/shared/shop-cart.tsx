'use client';

import React, { useEffect, useState, useCallback } from 'react';
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

import axios from 'axios';
import { getOrCreateSessionId } from '@/lib/utils';
import { CartItem, Cart } from '@/types';
import CartCard from '../ui/cart-card';
import Link from 'next/link';

const ShopCart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [open, setOpen] = useState(false);
    //  Met à jour le panier à chaque action
    const fetchCart = useCallback(async () => {
        try {
            const sessionId = getOrCreateSessionId();
            const response = await axios.get<{ content: Cart[] } | Cart[]>(
                `http://localhost:8080/api/cart`,
                {
                    params: sessionId ? { sessionId, page: 0, size: 10 } : { page: 0, size: 10 },
                    withCredentials: true,
                }
            );

            const carts = Array.isArray(response.data) ? response.data : response.data.content;
            const allItems = carts.flatMap(cart => cart.items || []);
            // console.log(response?.data?.content[0].id)
            setCartItems(allItems);
            setTotalItems(allItems.reduce((sum, item) => sum + item.quantity, 0));
        } catch (err) {
            console.error('Erreur chargement panier :', err);
        }
    }, []);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    // Supprimer un produit du panier


    return (
        <Sheet onOpenChange={setOpen}>
            <SheetTrigger asChild>
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
            </SheetTrigger>

            <SheetContent className="w-[500px]">
                <SheetHeader>
                    <SheetTitle className="text-3xl">Your Cart</SheetTitle>
                    <h2 className="text-lg font-medium">Items {cartItems.length}</h2>
                </SheetHeader>

                <div className="grid grid-cols-1 gap-3 px-2 mt-4">
                    {cartItems.map(item => {
                        return (
                            <CartCard key={item.id} cartItem={item} fetchCart={fetchCart} />
                        );
                    })}
                </div>

                <SheetFooter >
                    <SheetClose asChild>
                        <Button asChild >
                            <Link href={`/checkout/${cartItems[0]?.id} `} >Checkout</Link>
                        </Button>

                    </SheetClose>
                </SheetFooter>

            </SheetContent>
        </Sheet>
    );
};

export default ShopCart;