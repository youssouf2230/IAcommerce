'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import SectionLayout from '../layout/section-layout';

interface CategoryItem {
  id: number;
  name: string;
  imageUrl: string;
}

const CategorySection = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/categories/with-image');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Erreur lors du chargement des catégories', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <SectionLayout
      title='Shop by product category'
      description='Find the perfect device for your needs from our curated collections'
    >
      <div className='grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-4 gap-y-10'>
        {categories.map((item) => (
          <div
            key={item.id}
            className='flex flex-col outline-2 outline-border/50 items-center bg-accent/90 p-4 rounded-md group'
          >
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={150}
              height={150}
              className='object-contain group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ease-in-out'
            />
            <p className='mt-2 text-center text-sm'>{item.name}</p>
          </div>
        ))}
      </div>
    </SectionLayout>
  );
};

export default CategorySection;
