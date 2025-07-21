'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '../ui/button';

type ProductCardProps = {
  id: number;
  name: string;
  price: string;
  oldPrice: string;
  rating: number;
  imageUrl: string;
  initialHasLiked: boolean;
};

const ProductCard = ({
  id,
  name,
  price,
  oldPrice,
  rating,
  imageUrl,
  initialHasLiked,
}: ProductCardProps) => {
  const [liked, setLiked] = useState(initialHasLiked);
  const [loading, setLoading] = useState(false);

  const toggleLike = async () => {
    if (loading) return; // éviter plusieurs clics rapides
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/products/${id}/toggle-like`, {
        method: 'POST',
      });
      if (res.ok) {
        const updatedProduct = await res.json();
        setLiked(updatedProduct.hasLiked);
      } else {
        console.error('Erreur lors de la mise à jour du like');
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
        src={imageUrl}
        alt={name}
        width={300}
        height={300}
        className="aspect-square object-cover m-auto"
      />
      <h3 className="mt-3 font-semibold text-xl">{name}</h3>
      <Rating rating={rating} />
      <div className="flex items-center text-lg gap-2 mt-3">
        <span className="text-primary font-semibold">{price}</span>
        <span className="text-gray-500 line-through">{oldPrice}</span>
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
