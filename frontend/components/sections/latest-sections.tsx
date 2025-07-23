'use client';
import React, { useEffect, useState } from 'react';
import SectionLayout from '../layout/section-layout';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number;
  name: string;
  date: string;
  imageUrls: string[];  // <-- remplace colors par imageUrls
}

const LatestSections = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/products/latest');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Erreur de chargement des derniers produits', error);
      }
    };

    fetchLatestProducts();
  }, []);

  useGSAP(() => {
    gsap.from('.image', {
      filter: 'blur(8px)',
      stagger: 0.2,
      scale: 1.2,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.image',
        start: "top 90%",
        end: "end end",
        scrub: 1,
        markers: false,
      },
    });
  }, [products]);

  return (
      <SectionLayout title='Latest' description='Check out our latest products'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10'>
          {products.map((product) => (
              <div key={product.id} className='rounded-xl overflow-hidden border h-[80vh] w-full'>
                <Image
                    src={product.imageUrls?.[0] || '/placeholder.jpg'}
                    width={300}
                    height={300}
                    alt={product.name}
                    className='image h-full w-full object-cover'
                />
              </div>
          ))}
        </div>
      </SectionLayout>
  );
};

export default LatestSections;
