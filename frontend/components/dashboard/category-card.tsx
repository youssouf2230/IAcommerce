'use client'
import { deleteCategory } from '@/actions/category-actions';
import { CategoryForm } from '@/components/dashboard/category-form';
import { cn } from '@/lib/utils';
import { Category } from '@/types';
import { Edit, X } from 'lucide-react';
import Image from 'next/image';
import React, { useTransition } from 'react';
import { toast } from 'sonner';


const CategoryCard = ({ category }: { category: Category }) => {
    const pending=true
    const [isPending, startTransition] = useTransition();
    const handleClick = (id: number) => {
        startTransition(async () => {

            const result = await deleteCategory(id);
            if (result?.message) {
                toast.error(result.message)
            }
            else {
                toast.success("deleted successfully")
            }


        });

    };

    return (
        
        <div className={cn("group relative flex flex-col items-center gap-2 rounded-md border bg-muted p-4",isPending?'animate-pulse blur-xs':'')} >


            <Image src={category.urlImage} width={80} height={80} alt={category.name} priority className='sm:size-36 w-3/4  object-contain aspect-square m-auto' />


            <h3 className='text-center text-lg font-semibold mt-1'>{category.name}</h3>

            <div onClick={() => handleClick(category.id)} className='absolute -top-1  -right-1  bg-destructive/20 cursor-pointer  text-destructive rounded-full p-[5px] opacity-0   group-hover:opacity-100 transition-all duration-300 ease-in-out'>
                <X className='' size={14} />

            </div>
            <CategoryForm category={category} className='h-auto'>

                <div className='absolute -top-1  right-6  bg-emerald-500/20 cursor-pointer  text-emerald-600 rounded-full p-[5px] opacity-0   group-hover:opacity-100 transition-all duration-300 ease-in-out'>
                    <Edit className='' size={14} />

                </div>
            </CategoryForm>
        </div>
    );
}

export default CategoryCard;
