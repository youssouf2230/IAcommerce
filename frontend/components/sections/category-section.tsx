
import Image from 'next/image';
import SectionLayout from '../layout/section-layout';
import axios from 'axios';
import { Category } from '../types';


const fallbackImage = '/default.png';

const CategorySection = async () => {
  const categories = await axios.get('http://localhost:8080/api/categories/images').then(res => res.data);

  return (
    <SectionLayout
      title="Shop by product category"
      description="Find the perfect device for your needs from our curated collections"
    >
      <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-4 gap-y-10">
        {categories.map((category: Category) => (
          <div
            key={category.id}
            className="flex flex-col outline-2 outline-border/50 items-center bg-accent/90 p-4 rounded-md group"
          >
            <Image
              src={category.urlImage || fallbackImage}
              alt={category.name}
              width={150}
              height={150}

              className="object-contain group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ease-in-out"
            />
            <p className="mt-2 text-center text-sm">{category.name}</p>
          </div>
        ))}
      </div>
    </SectionLayout>
  );
};

export default CategorySection;
