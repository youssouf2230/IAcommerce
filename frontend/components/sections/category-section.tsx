
import Image from 'next/image';
import SectionLayout from '../layout/section-layout';
import axios from 'axios';
import { Category } from '../../types';
import { API_BASE_URL } from '@/lib/utils';


const fallbackImage = '/default.png';

const CategorySection = async () => {
  const categories = await axios.get(`${API_BASE_URL}/api/categories/images`).then(res => res.data);
  if(!categories) return null

  return (
    <SectionLayout
      title="Shop by  category"
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

              className="object-contain flex-1 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ease-in-out"
            />
            <p className=" text-center text-sm  font-medium  ">{category.name}</p>
          </div>
        ))}
      </div>
    </SectionLayout>
  );
};

export default CategorySection;
