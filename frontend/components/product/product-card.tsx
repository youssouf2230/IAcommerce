'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Product } from '../../types';
import { Rating } from '../shared/rating';



const ProductCard = (props: Product) => {
  const [liked, setLiked] = useState(props.hasLiked);
  const [loading, setLoading] = useState(false);

  const toggleLike = async () => {
    if (loading) return; // éviter plusieurs clics rapides
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/products/${props.id}/toggle-like`, {
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
    <div className="p-6 relative bg-white  rounded-lg">
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

      <Link href={`/products/${props.id}`}>
        <Image
            src={props.imageUrls[0]}
            alt={props.name}
            width={300}
            height={300}
            className="aspect-square object-contain m-auto cursor-pointer  "
        />
      </Link>
      <h3 className="mt-3 font-semibold text-zinc-900 text-xl">{props.name}</h3>
      <Rating rating={props.rating} />
      <div className="flex items-center text-lg gap-2 mt-3">
        <span className="text-primary font-semibold">{props.sellPrice} Dh</span>
        <span className="text-gray-500 line-through">{props.oldPrice ? props.oldPrice: 200 }Dh</span>
      </div>
      <Button variant="default" size="lg" className="mt-4 w-full">
        <ShoppingCart size={20} /> Ajouter au panier
      </Button>
    </div>
  );
};

export default ProductCard;

