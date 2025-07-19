import React from 'react';
import Image from 'next/image';
import { Heart, Plus, Star } from 'lucide-react';
import { Button } from '../ui/button';
import SectionLayout from '../layout/section-layout';

const FeaturesProducts = () => {
    const products = [
        {
            name: 'Apple Watch Band',
            price: '$49.99',
            oldPrice: '$69.99',
            rating: 4,
        },
        {
            name: 'Sport Loop Band',
            price: '$39.99',
            oldPrice: '$54.99',
            rating: 5,
        },
        {
            name: 'Ocean Band',
            price: '$59.99',
            oldPrice: '$79.99',
            rating: 3,
        },
        {
            name: 'Trail Loop',
            price: '$44.99',
            oldPrice: '$59.99',
            rating: 4,
        },
     
    ];

    const imageUrl =
        'https://resource.logitech.com/w_544,h_466,ar_7:6,c_pad,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s-mac-bluetooth-mouse/gallery/space-grey/mx-master-3s-for-mac-mouse-top-view-space-grey.png';

    return (
        <SectionLayout title='Featured Products' description='Discover our best-selling accessories crafted for comfort, style, and performance.'>
             
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {products.map((product, index) => (
                    <div key={index} className=' p-6 relative  bg-card group rounded-lg '>
                        <div className='p-1.5 bg-muted absolute top-3 right-5 rounded-full cursor-pointer'>

                        <Heart size={20}  className='  text-foreground '/>
                        </div>
                        <Image
                            src={imageUrl}
                            alt={product.name}
                            width={300}
                            height={300}
                            className=' aspect-square object-cover  m-auto'
                        />
                        <h3 className='mt-3 font-semibold text-xl'>{product.name}</h3>
                        <div className='flex items-center gap-2 mt-1'>
                            <span className='text-primary font-semibold'>{product.price}</span>
                            <span className='text-gray-500 line-through'>{product.oldPrice}</span>
                        </div>
                        <div className='flex mt-2'>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    size={16}
                                    className={i < product.rating ? 'text-yellow-500' : 'text-gray-300'}
                                    fill={i < product.rating ? 'currentColor' : 'none'}
                                />
                            ))}
                        </div>
                      <Button variant="default" size={'lg'} className='mt-4 w-full'> <Plus size={20} /> Add to Cart </Button>
                    </div>
                ))}
            </div>
        </SectionLayout>
    );
};

export default FeaturesProducts;
