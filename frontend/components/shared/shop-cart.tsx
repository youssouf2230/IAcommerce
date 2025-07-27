'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { ShoppingCart, Trash } from 'lucide-react';
import Image from 'next/image';
import NumberField from '../ui/number-field';
import axios from 'axios';
import { getOrCreateSessionId } from '@/lib/utils';
import { CartItem, Cart } from '@/types';

const ShopCart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalItems, setTotalItems] = useState(0);

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
    const removeItem = async (itemId: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/cart/item/${itemId}`, {
                withCredentials: true,
            });
            fetchCart();
        } catch (err) {
            console.error('Erreur suppression article :', err);
        }
    };

    // Changer la quantité
    const updateQuantity = async (itemId: number, newQuantity: number) => {
        try {
            await axios.put(
                `http://localhost:8080/api/cart/item/${itemId}`,
                { quantity: newQuantity },
                { withCredentials: true }
            );
            fetchCart();
        } catch (err) {
            console.error('Erreur mise à jour quantité :', err);
        }
    };

    return (
        <Sheet>
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
                        const { product } = item;
                        const imageUrl = product.imageUrls?.[0] || '/default.png';

<<<<<<< HEAD
                        <p className="absolute -right-2 -top-2 size-4 flex items-center justify-center rounded-full bg-rose-600 text-[10px] text-white">
                            2
                        </p>
                        <ShoppingCart size={20} />
                    </Button>
                </SheetTrigger>
                <SheetContent className='w-[500px]'>
                    <SheetHeader>
                        <SheetTitle className='text-3xl'>
                            Your Cart
                        </SheetTitle>

                        <h2 className=' text-lg font-medium'>Items {products.length}</h2>


                    </SheetHeader>
                    <div className=' grid grid-cols-1 gap-3 px-2'>
                        {products.map((product) => (
                            <div key={product.id} className="grid p-4 grid-cols-1 bg-muted/60 rounded-xl ">
                                <div className="flex justify-between items-center ">

                                    <Image
                                        src={product.imageUrl}
=======
                        return (
                            <div
                                key={item.id}
                                className="grid p-4 grid-cols-1 bg-muted/60 rounded-xl"
                            >
                                <div className="flex justify-between items-center">
                                    <Image
                                        src={imageUrl}
>>>>>>> 6fb64ac (cart active)
                                        alt={product.name}
                                        width={48}
                                        height={48}
                                        className="size-15 rounded-full mr-4 aspect-square object-contain"
                                    />
<<<<<<< HEAD
                                    <div className='flex-1'>
                                        <h3 className="text-lg font-semibold">{product.name}</h3>
                                        <p className="text-zinc-500 font-medium">{product.price}</p>
                                    </div>
                                    <Button variant="ghost" size="icon">

                                        <Trash size={20} className='text-destructive' />
                                    </Button>

                                </div>
                                <div className='w-max m-auto'>
                                    <NumberField />
                                </div>
                            </div>
                        ))}

                    </div>


                </SheetContent>
            </Sheet>
        </div>
=======
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold">{product.name}</h3>
                                        <p className="text-zinc-500 font-medium">
                                            {product.sellPrice} MAD x {item.quantity}
                                        </p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <Trash size={20} className="text-destructive" />
                                    </Button>
                                </div>
                                <div className="w-max m-auto mt-2">
                                    <NumberField
                                        value={item.quantity}
                                        onChange={val => updateQuantity(item.id, val)}
                                        min={1}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </SheetContent>
        </Sheet>
>>>>>>> 6fb64ac (cart active)
    );
};

export default ShopCart;
