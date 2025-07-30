import React from 'react';
import ProductForm from './form-add';
import axios from 'axios';
import { Category } from '@/types';

const Page =  async () => {
  const categories:Category[] = await axios.get('http://localhost:8080/api/dashboard/categories').then((res) => res.data);
  console.log(categories)
    return (
        
        <div className='px-'>
            <h1 className='text-3xl font-semibold px-4 mb-3 mt-8'>
                Add Product
            </h1>

            <ProductForm categories={categories }/>
        </div>
    );
}

export default Page;
