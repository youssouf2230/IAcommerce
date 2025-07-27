'use client';
import {  useState, useTransition } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { Product } from '../../types';
import { Rating } from '../shared/rating';
import AddToCartButton from '../shared/add-to-cart';


const ProductCard = (props: Product) => {
  const [liked, setLiked] = useState(props.hasLiked);
  const [loading, setLoading] = useState(false);
  const [ispendingLike, startTransition] = useTransition();


  const toggleLike = () => startTransition(async () => {
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
  });




  return (
    <div className="p-6 relative bg-white rounded-lg border flex flex-col">
      <button
        onClick={toggleLike}
        disabled={ispendingLike}
        aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
        className="p-1.5 absolute top-3 right-5 rounded-full cursor-pointer transition-colors bg-gray-100 hover:bg-gray-200"
      >
        <Heart
          size={20}
          className={liked ? 'text-red-600' : 'text-foreground'}
          fill={liked ? 'currentColor' : 'none'}
        />
      </button>

      <Link href={`/products/${props.id}`} className="flex-grow">
        <Image
          src={props.imageUrls[0]}
          alt={props.name}
          width={300}
          height={300}
          loading="lazy"
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className="aspect-square object-contain m-auto"
        />
      </Link>

      <div className="mt-auto pt-4"> {/* Pushes content to the bottom */}
        <h3 className="font-semibold text-zinc-900 text-xl">{props.name}</h3>
        <Rating rating={props.rating} />
        <div className="flex items-center text-lg gap-2 mt-3">
          <span className="text-primary font-semibold">{props.sellPrice} Dh</span>
          {/* ACCESSIBILITY FIX: Increased contrast */}
          <span className="text-gray-600 line-through">{props.oldPrice ?? 200}Dh</span>
        </div>
       <AddToCartButton productId={props.id} />
      </div>
    </div>
  );
};

export default ProductCard;

