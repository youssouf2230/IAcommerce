'use client'
import React, { useTransition } from 'react';
import { SubmitButton } from './submit-button';
import { ShoppingCart } from 'lucide-react';
import { cn, getOrCreateSessionId } from '@/lib/utils';
import { addToCart } from '@/app/actions/cart-action';
import { toast } from 'sonner';

const AddToCartButton = ({ productId, className }: { productId: number, className?: string }) => {

  const [isPendingcart, startCartTransition] = useTransition();
  const handleAddToCart = () => {
    startCartTransition(async () => {
      const sessionId = getOrCreateSessionId();
      const result = await addToCart({ productId, sessionId });


      if (result.success) {
        toast.success(result.success);
      }
      if (result.error) {
        toast.error(result.error);
      }
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
