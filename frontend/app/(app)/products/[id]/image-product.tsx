
'use client'
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const OtherImage = ({ images, setImage,currentImage }: { images: string[], setImage: React.Dispatch<React.SetStateAction<string>>,currentImage:string }) => {

    return (
        <div className=' flex flex-row md:flex-col   gap-2 w-max m-auto mt-3 '>
            {images.map((image, index) => (
                <div key={index} className="flex  items-center ">
                    <Image
                        width={80}
                        height={80}
                        src={image}
                        alt={`Image ${index + 1}`}
                        className= {cn(" size-20 mb-2 rounded-md cursor-pointer object-contain aspect-square", currentImage !== image ? '  grayscale' : ' ')} 
                        onMouseEnter={() => setImage(image)}
                    />
                </div>
            ))}
        </div>
    );
}




export const ImageProduct = ({ imageUrls, name }: { imageUrls: string[], name: string }) => {
    const [image, setImage] = React.useState(imageUrls[0]);

    return (
        <div className="flex-wrap-reverse gap-3 flex m-auto">
           
           {imageUrls.length>1 &&  <OtherImage images={imageUrls} setImage={setImage} currentImage={image} /> }
            <Image
                src={image}
                width={600}
                height={600}
                alt={name}
                className="rounded-lg object-contain m-auto "
            />
        </div>
    )
}