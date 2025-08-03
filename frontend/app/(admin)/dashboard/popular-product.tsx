import { API_BASE_URL } from '@/lib/utils';
import axios from 'axios';
import React from 'react';

const PopularProduct = async () => {

     const products = await axios.get(`${API_BASE_URL}/api/products/latest`).then(res => res.data)
  if (!products) return null
    return (
        <div>
            
        </div>
    );
}

export default PopularProduct;
