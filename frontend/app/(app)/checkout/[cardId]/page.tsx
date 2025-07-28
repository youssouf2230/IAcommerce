import React from 'react';

import { Trash } from 'lucide-react';
import { products } from '@/data/products';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import NumberField from '@/components/ui/number-field';
import { AdditionalInfoForm } from './AdditionalInfoForm';

const Page = ({ params }: { params: { cartId: string } }) => {
    return (
        <div className='p-8'>
            <h1 className='text-3xl font-semibold my-10'>Checkout</h1>
            <div>

                <div className='flex md:flex-row flex-col max-md:gap-10  relative'>
                    <div className='f;ex flex-1 flex-col space-y-4'>
                        {products.map((product) => (
                            <div key={product.id} className="grid p-4 grid-cols-1 bg-muted/60 rounded-xl ">
                                <div className="flex justify-between items-center ">

                                    <Image
                                        src={product.imageUrl}
                                        alt={product.name}
                                        width={48}
                                        height={48}
                                        className="size-15 rounded-full mr-4 aspect-square object-contain"
                                    />
                                    <div className='flex-1'>
                                        <h3 className="text-lg font-semibold">{product.name}</h3>
                                        <p className="text-zinc-500 font-medium">{product.price}</p>
                                    </div>
                                    <Button variant="ghost" size="icon">

                                        <Trash size={20} className='text-destructive' />
                                    </Button>

                                </div>
                                <div className='w-max m-auto'>
                                    <NumberField />
                                </div>
                            </div>
                        ))}
                  
                    </div>
                    <div className='flex-1'>

                        <div className='sticky top-10 m-auto'>
                            <AdditionalInfoForm />
                        <h1 className='text-3xl font-bold px-10 w-full   flex  justify-end'>Total : 12000 DH </h1>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Page;
