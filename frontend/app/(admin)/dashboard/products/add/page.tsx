import React from 'react';
import ProductForm from './form-add';
import axios from 'axios';
import { Category } from '@/types';
import { API_BASE_URL } from '@/lib/utils';


const Page =  async () => {
  const categories:Category[] = await axios.get(`${API_BASE_URL}/api/dashboard/categories`).then((res) => res.data);
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
