
'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from './button';
import { Trash } from 'lucide-react';
import NumberField from './number-field';
import axios from 'axios';
import { CartItem } from '@/types';
import { toast } from 'sonner'; // Assuming you're using sonner for toasts
import { API_BASE_URL } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';


const CartCard = ({ cartItem }: { cartItem: CartItem }) => {
  const {removeItem,updateQuantity}=useCart()

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