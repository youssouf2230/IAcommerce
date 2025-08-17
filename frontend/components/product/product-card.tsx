'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { Product } from '../../types';
import { Rating } from '../shared/rating';
import { API_BASE_URL } from '@/lib/utils';
import AddToCartButton from '../cart/add-to-cart';




const ProductCard = (props: Product) => {
  const [liked, setLiked] = useState(props.hasLiked);
  const [loading, setLoading] = useState(false);

  const toggleLike = async () => {
    if (loading) return; // éviter plusieurs clics rapides
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/products/${props.id}/toggle-like`, {
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
    <div className="p-8 relative bg-white  rounded-lg">
      <div
        onClick={toggleLike}
        className={`p-1.5 absolute top-3 z-20 right-5 rounded-full cursor-pointer ${liked ? 'bg-red-100' : 'bg-transparent'}`}
        title={liked ? 'remove from favorites' : 'add to favorites'}
      >
        <Heart
          size={20}
          className={`   block ${liked ? 'text-red-600' : 'text-foreground'}`}
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
          priority
          unoptimized={false}
          className="aspect-square min-size-60 object-contain m-auto cursor-pointer  hover:rotate-3 transition-all duration-300 ease-in-out"
        />
      </Link>
      <h3 className="mt-3 font-semibold text-zinc-900 text-xl">{props.name}</h3>
      <Rating rating={props.rating} />
      <div className="flex items-center text-lg gap-2 mt-3">
        <span className="text-primary font-semibold">{props.sellPrice} Dh</span>
        <span className="text-gray-500 line-through">{props.oldPrice ? props.oldPrice : 200}Dh</span>
      </div>
    

      <AddToCartButton product={props} />

    </div>
  );
};

export default ProductCard;
