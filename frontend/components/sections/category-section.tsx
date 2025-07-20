/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import React from 'react';
import SectionLayout from '../layout/section-layout';
import { category } from '../data/categories';

const CategorySection = () => {
    return (
        <SectionLayout description='Find the perfect device for your needs from our curated collections' title='Shop by product category'> 
            <div className='grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-4 gap-y-10 '>
                {category.map((item: any, index) => {
                 

                    return (
                        <div className='flex flex-col outline-2 outline-border/50  items-center bg-accent/90 p-4 rounded-md group' key={index}>
                            <Image
                                src={item.image as string}
                                alt={item.category as string}
                                width={150}
                                height={150}
                                className='object-contain group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ease-in-out'
                            />
                            <p className='mt-2 text-center text-sm'>{item.category as string}</p>
                        </div>
                    );
                })}
            </div>
        </SectionLayout>
    );
}

export default CategorySection;
