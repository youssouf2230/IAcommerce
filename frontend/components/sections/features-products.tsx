'use client';

import React, { useEffect, useState } from 'react';
import SectionLayout from '../layout/section-layout';
import ProductCard from '../product/product-card';
import { useTranslations } from 'next-intl';
import axios from 'axios';

type Color = {
  id: number;
  color: string;
  urlImage: string;
};

type Product = {
  id: number;
  name: string;
  sellPrice: number;
  oldPrice: number;
  rating: number;
  colors: Color[];
  hasLiked: boolean;
};

const FeaturesProducts = () => {
  const t = useTranslations('FeaturesProducts');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get<Product[]>('http://localhost:8080/api/products/trending')
      .then((res) => {
        console.log("Produits récupérés :", res.data);
        setProducts(res.data);
      })
      .catch((err) => console.error('Erreur chargement produits:', err));
  }, []);

  return (
    <SectionLayout title={t('title')} description={t('description')}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product) => {
          const imageUrl = product.colors?.[0]?.urlImage || '/default.png';
          console.log("URL image utilisée :", imageUrl);

          return (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.sellPrice.toFixed(2) + ' DH'}
              oldPrice={product.oldPrice.toFixed(2) + ' DH'}
              rating={product.rating}
              imageUrl={imageUrl}
              initialHasLiked={product.hasLiked}
            />
          );
        })}
      </div>
    </SectionLayout>
  );
};

export default FeaturesProducts;
