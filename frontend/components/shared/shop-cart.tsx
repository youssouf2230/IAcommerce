import React from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '../ui/button';
import { Delete, ShoppingCart, Trash } from 'lucide-react';
import { products } from '@/data/products';
import Image from 'next/image';
import NumberField from '../ui/number-field';

const ShopCart = () => {
    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>

                    <Button
                        size="icon"
                        variant="ghost"
                        className="relative cursor-pointer"
                        aria-label="Cart"
                    >


                        <p className="absolute -right-2 -top-2 size-4 flex items-center justify-center rounded-full bg-rose-600 text-[10px] text-white">
                            2
                        </p>
                        <ShoppingCart size={20} />
                    </Button>
                </SheetTrigger>
                <SheetContent className='w-[500px]'>
                    <SheetHeader>
                        <SheetTitle className='text-3xl'>
                            Your Cart
                        </SheetTitle>

                        <h2 className=' text-lg font-medium'>Items {products.length}</h2>
                      
                      
                    </SheetHeader>
            <div className=' grid grid-cols-1 gap-3 px-2'>
                    {products.map((product) => (
                        <div key={product.id} className="grid p-4 grid-cols-1 bg-muted/60 rounded-xl ">
                            <div  className="flex justify-between items-center ">

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

                              <Trash size={20} className='text-destructive'/>
                              </Button>

                                </div>
                            <div className='w-max m-auto'>
                                <NumberField/>
                            </div>
                        </div>
                    ))}

                    </div>
           
                     
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default ShopCart;
