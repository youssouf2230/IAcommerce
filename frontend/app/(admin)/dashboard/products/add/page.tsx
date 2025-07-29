import React from 'react';
import ProductForm from './form-add';
import axios from 'axios';

const Page =  () => {
  
    return (
        
        <div className='px-'>
            <h1 className='text-3xl font-semibold px-4 mb-3 mt-8'>
                Add Product
            </h1>

            <ProductForm/>
        </div>
    );
}

export default Page;
