/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import React from 'react';

const CategorySection = () => {
    const category = [{
        image: 'https://resource.logitech.com/w_300,h_300,ar_1,c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/homepage/delorean-hp/products-with-background/new-images/keyboards.png',
        category: 'Claviers'
    },
    {
        image: 'https://resource.logitech.com/w_300,h_300,ar_1,c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/homepage/delorean-hp/products-with-background/new-images/combos.png',
        category: 'Ensembles'
    },
    {
        image: 'https://resource.logitech.com/w_300,h_300,ar_1,c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/homepage/delorean-hp/products-with-background/new-images/mice.png',
        category: 'Souris'
    },
    {
        image: 'https://resource.logitech.com/w_300,h_300,ar_1,c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/homepage/delorean-hp/products-with-background/new-images/speakers.png',
        category: 'Haut-parleurs'
    },
    {
        image: 'https://resource.logitech.com/w_300,h_300,ar_1,c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/homepage/delorean-hp/products-with-background/new-images/conference-room-cameras.png',
        category: 'Cameras'
    },
    {
        image: 'https://resource.logitech.com/w_300,h_300,ar_1,c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/homepage/delorean-hp/products-with-background/new-images/driving-simulation.png',
        category: 'Volants'
    },
    {
        image: 'https://resource.logitech.com/w_300,h_300,ar_1,c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/homepage/delorean-hp/products-with-background/new-images/headsets-earbuds.png',
        category: 'Casques-micro'
    },
    {
        image: 'https://resource.logitech.com/w_300,h_300,ar_1,c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/homepage/delorean-hp/products-with-background/new-images/lighting.png',
        category: "clairage"
    },
    {
        image: 'https://resource.logitech.com/w_300,h_300,ar_1,c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/homepage/delorean-hp/products-with-background/new-images/webcams.png',
        category: 'Webcams'
    },
    {
        image: 'https://resource.logitech.com/w_300,h_300,ar_1,c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/homepage/delorean-hp/products-with-background/new-images/microphones.png',
        category: 'Microphones'
    },
    {
        image: 'https://resource.logitech.com/w_300,h_300,ar_1,c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/homepage/delorean-hp/products-with-background/new-images/mobile-devices.png',
        category: 'Ã\x89tuis clavier pour iPad'
    },
    {
        image: 'https://resource.logitech.com/w_300,h_300,ar_1,c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/homepage/delorean-hp/products-with-background/new-images/accessories.png',
        category: 'Accessoires'
    }]
    return (

        <div className=''>
            <div className='flex flex-col mb-10 gap-1'>
            <h1 className='text-4xl font-semibold '>Shop by product category</h1>
            <p className='text-muted-foreground '>Find the perfect device for your needs from our curated collections</p>

            </div>


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

        </div>
    );
}

export default CategorySection;
