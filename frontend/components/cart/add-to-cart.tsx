'use client'
import React, { useTransition } from 'react';
import { SubmitButton } from '../shared/submit-button';
import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

import { useCart } from '@/hooks/use-cart';
import { Product } from '@/types';

const AddToCartButton = ({ product, className }: { product: Product, className?: string }) => {

  const [isPendingcart, startCartTransition] = useTransition();
  const {addToCart}=useCart();
  const handleAddToCart = () => {
    startCartTransition(async () => {
       addToCart(product);
    });
  };
  return (
    <SubmitButton

      onClick={handleAddToCart}

      pending={isPendingcart}
      variant="default"
      size="lg"
      className={cn("mt-4 w-full", className)}
    >
      {/* ACCESSIBILITY FIX: Hide decorative icon from screen readers */}
      <ShoppingCart size={20} className="mr-1" aria-hidden="true" />
      {/* UX FIX: Show pending state text */}
      Add to cart
    </SubmitButton>
  );
}

export default AddToCartButton;
