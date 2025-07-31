import CategoryCard from '@/components/shared/category-card';
import { Category } from '@/types';
import axios from 'axios';
import { Plus } from 'lucide-react';
import React from 'react';
import { CategoryForm } from './category-form';

const Page = async () => {
    const categories = await axios.get('http://localhost:8080/api/categories/images').then(res => res.data);
    
    if (!categories) return null
    return (
        <div className="container mx-auto mt-12 ">
            <h1 className="text-3xl font-semibold my-6">Categories</h1>
            <div className='grid   xl:grid-cols-5 lg:grid-cols-4  sm:grid-cols-3 grid-cols-2  gap-4 '>
                <CategoryForm >

                    <div className=' bg-card/50  flex justify-center items-center text-foreground/30 hover:text-foreground transition-colors cursor-pointer'>
                        <Plus size={50} />

                    </div>
                </CategoryForm>

                {categories.map((category: Category) => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
}

export default Page;
