/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Product } from '../types';
import { useSession } from '../hooks/use-session';



const ProductCard = (props: Product) => {
  const [liked, setLiked] = useState(props.hasLiked);
  const [loading, setLoading] = useState(false);
  const { session } = useSession();

  const toggleLike = async () => {
  if (loading) return; // prevent multiple fast clicks
  setLoading(true);

  try {
    const res = await fetch(`http://localhost:8080/api/products/${props.id}/toggle-like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.token}`,
      },
    
    });
    console.log(res);
    console.log("Session Token:", session?.token);


    if (res.ok) {
      const updatedProduct = await res.json();
      setLiked(updatedProduct.hasLiked);
    } else {
      console.error('Erreur lors de la mise à jour du like', await res.text());
    }
  } catch (error) {
    console.error('Erreur réseau:', error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="p-6 relative bg-card group rounded-lg">
      <div
        onClick={toggleLike}
        className={`p-1.5 absolute top-3 right-5 rounded-full cursor-pointer ${liked ? 'bg-red-100' : 'bg-transparent'}`}
        title={liked ? 'remove from favorites' : 'add to favorites'}
      >
        <Heart
          size={20}
          className={liked ? 'text-red-600' : 'text-foreground'}
          fill={liked ? 'currentColor' : 'none'}
          strokeWidth={2}
        />
      </div>

      <Image
        src={props.colors[0].urlImage}
        alt={props.name}
        width={300}
        height={300}
        className="aspect-square object-cover m-auto"
      />
      <h3 className="mt-3 font-semibold text-xl">{props.name}</h3>
      <Rating rating={props.rating} />
      <div className="flex items-center text-lg gap-2 mt-3">
        <span className="text-primary font-semibold">{props.sellPrice}</span>
        <span className="text-gray-500 line-through">{props.oldPrice}</span>
      </div>
      <Button variant="default" size="lg" className="mt-4 w-full">
        <ShoppingCart size={20} /> Ajouter au panier
      </Button>
    </div>
  );
};

export default ProductCard;

const Rating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars <= 0.75;

  return (
    <div className="flex mt-2">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < fullStars) {
          return <Star key={i} size={16} className="text-yellow-500" fill="currentColor" />;
        } else if (hasHalfStar && i === fullStars) {
          return (
            <Star
              key={i}
              size={16}
              className="text-yellow-500"
              fill="currentColor"
              style={{ clipPath: 'inset(0 50% 0 0)' }} // moitié gauche remplie
            />
          );
        } else {
          return <Star key={i} size={16} className="text-gray-300" fill="none" />;
        }
      })}
    </div>
  );
};
