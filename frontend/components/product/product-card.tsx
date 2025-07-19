import React from 'react';
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '../ui/button';

type ProductCardProps = {
  name: string;
  price: string;
  oldPrice: string;
  rating: number;
  imageUrl: string;
};

const ProductCard = ({ name, price, oldPrice, rating, imageUrl }: ProductCardProps) => {
  return (
    <div className="p-6 relative bg-card group rounded-lg">
      <div className="p-1.5 bg-muted absolute top-3 right-5 rounded-full cursor-pointer">
        <Heart size={20} className="text-foreground" />
      </div>
      <Image
        src={imageUrl}
        alt={name}
        width={300}
        height={300}
        className="aspect-square object-cover m-auto"
      />
      <h3 className="mt-3 font-semibold text-xl">{name}</h3>

      <Rating rating={rating}/>
      <div className="flex items-center text-lg gap-2 mt-3">
        <span className="text-primary font-semibold">{price}</span>
        <span className="text-gray-500 line-through">{oldPrice}</span>
      </div>
    
      <Button variant="default" size="lg" className="mt-4 w-full">
        <ShoppingCart size={20} /> Add to Cart
      </Button>
    </div>
  );
};



export default ProductCard;


const Rating = ({ rating }: { rating: number }) => {
    return(
          <div className="flex mt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? 'text-yellow-500' : 'text-gray-300'}
            fill={i < rating ? 'currentColor' : 'none'}
          />
        ))}
      </div>
    )
}