import SectionLayout from '../layout/section-layout';
import ProductCard from '../product/product-card';
import axios from 'axios';
import { getTranslations } from 'next-intl/server';
import { Product } from '../types';


const FeaturesProducts = async () => {

  const t = await getTranslations('FeaturesProducts');
  const products = await axios.get("http://localhost:8080/api/products/trending").then(res => res.data)
  if (!products) return null
  return (
    <SectionLayout title={t('title')} description={t('description')}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product: Product, index: number) => {
          const imageUrl = product.imageUrls[0] || '/default.png';
          console.log("URL image utilisée :", imageUrl);

          return (
            <ProductCard
              key={index}
              {...product}
            />
          );
        })}
      </div>
    </SectionLayout>
  );
};

export default FeaturesProducts;
