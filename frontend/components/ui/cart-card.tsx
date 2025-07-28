
'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from './button';
import { Trash } from 'lucide-react';
import NumberField from './number-field';
import axios from 'axios';
import { CartItem } from '@/types';
import { toast } from 'sonner'; // Assuming you're using sonner for toasts

const CartCard = ({ cartItem, fetchCart }: { cartItem: CartItem, fetchCart: () => void }) => {

    const removeItem = async (itemId: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/cart/item/${itemId}`, {
                withCredentials: true,
            });
            fetchCart();
            toast.success("Item removed from cart!"); // Success toast
        } catch (err) {
            console.error('Erreur suppression article :', err);
            toast.error("Failed to remove item."); // Error toast
        }
    };

    const updateQuantity = async (itemId: number, newQuantity: number) => {
        try {
            await axios.put(
                `http://localhost:8080/api/cart/item/${itemId}`,
                { quantity: newQuantity },
                { withCredentials: true }
            );
            fetchCart();
            toast.success("Quantity updated!"); // Success toast
        } catch (err) {
            console.error('Erreur mise à jour quantité :', err);
            toast.error("Failed to update quantity."); // Error toast
        }
    };
console.log()
    return (
        <div className="grid p-4 grid-cols-1 bg-muted/60 rounded-xl">
            <div className="flex justify-between items-center">
                <Image
                    src={cartItem.product.imageUrls[0]}
                    alt={cartItem.product.name}
                    width={48}
                    height={48}
                    className="size-15 rounded-full mr-4 aspect-square object-contain"
                    
                />
                <div className="flex-1">
                    <h3 className="text-lg font-semibold">{cartItem.product.name}</h3>
                    <p className="text-zinc-500 font-medium">
                        {cartItem.product.sellPrice} MAD x {cartItem.quantity}
                    </p>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(cartItem.id)}
                >
                    <Trash size={20} className="text-destructive" />
                </Button>
            </div>
            <div className="w-max m-auto mt-2">
                <NumberField
                    value={cartItem.quantity}
                    max={cartItem.product.stockQuantity}
                    onChange={val => updateQuantity(cartItem.id, val)}
                    min={1}
                />
            </div>
        </div>
    );
}

export default CartCard;