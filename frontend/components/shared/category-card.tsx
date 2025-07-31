'use client'
import { deleteCategory } from '@/app/(admin)/dashboard/categories/category-actions';
import { CategoryForm } from '@/app/(admin)/dashboard/categories/category-form';
import { Category } from '@/types';
import { Edit, X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { toast } from 'sonner';


const CategoryCard = ({ category }: { category: Category }) => {
    const handleClick = async (id: number) => {
        const result = await deleteCategory(id);
        if (result?.message) {
            toast.error(result.message)
        }
        else {
            toast.success("deleted successfully")
        }

    };

    return (
        <div className='bg-card/80 px-7 py-5 rounded-3xl relative group'>


            <Image src={category.urlImage} width={80} height={80} alt={category.name} className='sm:size-36 w-3/4  object-contain aspect-square m-auto' />


            <h3 className='text-center text-lg font-semibold mt-1'>{category.name}</h3>

            <div onClick={() => handleClick(category.id)} className='absolute -top-1  -right-1  bg-destructive/20 cursor-pointer  text-destructive rounded-full p-1.5 opacity-0   group-hover:opacity-100 transition-all duration-300 ease-in-out'>
                <X className='' size={14} />

            </div>
            <CategoryForm category={category}  className='h-auto'>

                <div className='absolute -top-1  right-7  bg-emerald-500/20 cursor-pointer  text-emerald-600 rounded-full p-1.5 opacity-0   group-hover:opacity-100 transition-all duration-300 ease-in-out'>
                    <Edit className='' size={14} />

                </div>
            </CategoryForm>
        </div>
    );
}

export default CategoryCard;
