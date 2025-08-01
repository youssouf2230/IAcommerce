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
import { API_BASE_URL } from '@/lib/utils';


const ShopCart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [open, setOpen] = useState(false);
    // id to cart
    const [cartId, setCartId] = useState<number | null>(null);

    // Met à jour le panier à chaque action
    const fetchCart = useCallback(async () => {
        try {
            const sessionId = getOrCreateSessionId();
            const response = await axios.get<{ content: Cart[] } | Cart[]>(
                `${API_BASE_URL}/api/cart`,
                {
                    params: sessionId ? { sessionId, page: 0, size: 10 } : { page: 0, size: 10 },
                    withCredentials: true,
                }
            );

            const carts = Array.isArray(response.data) ? response.data : response.data.content;

            if (carts.length > 0) {
                setCartId(carts[0].id);
                const allItems = carts[0].items || [];
                setCartItems(allItems);
                setTotalItems(allItems.reduce((sum, item) => sum + item.quantity, 0));
            } else {
                setCartItems([]);
                setTotalItems(0);
                setCartId(null);
            }
        } catch (err) {
            console.error('Erreur chargement panier :', err);
        }
    }, []);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    return (
        <Sheet onOpenChange={setOpen} >
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

            <SheetContent className="w-[500px] h-screen  overflow-y-auto" >
                <SheetHeader>
                    <SheetTitle className="text-3xl">Your Cart</SheetTitle>
                    <h2 className="text-lg font-medium">Items {cartItems.length}</h2>
                </SheetHeader>

                <div className="grid grid-cols-1 gap-3 px-2 mt-4">
                    {cartItems.map(item => (
                        <CartCard key={item.id} cartItem={item} fetchCart={fetchCart} />
                    ))}
                </div>

                <SheetFooter>
                    <SheetClose asChild>
                        <Button asChild disabled={!cartId}>
                            {/* redirect vs checkout/[cartId]/page.tsx */}
                            <Link href={`/checkout/${cartId}`}>Checkout</Link>
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default ShopCart;
