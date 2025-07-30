'use client'
import React from 'react';
import SectionLayout from '../layout/section-layout';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);
const SustainabilityHighlight = () => {

    useGSAP(() => {

        gsap.from('.image', {

            filter: 'blur(8px)',
            stagger: 0.2,
            scale: 1.2,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.image',
                start: "top 90%",
                end: "end end",
                scrub: 1,
                markers: false,

            }
        });

    })


    return (
        <SectionLayout  explore={false} className=' bg-gradient-to-r from-zinc-800 to-zinc-950  text-zinc-50  p-10 rounded-xl'  >
            <div className='flex flex-col gap-5 justify-center items-center max-w-4xl m-auto mb-10 text-center'>
                <h3 className='text-xl '>Design for sustainability</h3>
                <h2 className='md:text-6xl text-4xl font-medium '>Everything Matters</h2>
                <p className='md:text-lg font-extralight text-neutral-400'>When it comes to doing better for our planet, it’s on us. Every component. Every process. Every product.</p>
                <Button  size={'lg'} className='rounded-full md:p-6 text-black bg-zinc-50 hover:bg-zinc-100'> See all products </Button>
            </div>


            <div className='grid grid-cols-3 md:gap-10 gap-5'>
                <div className=' rounded-xl overflow-hidden  lg:h-[70vh]  h-[40vh] w-full    '>
                    <Image src="https://images.pexels.com/photos/11031586/pexels-photo-11031586.jpeg" width={200} height={200} alt='iphone' className=' image h-full w-full object-cover' />
                </div>
                <div className='rounded-xl overflow-hidden   lg:h-[70vh] h-[40vh] w-full   '>
                    <Image src="https://images.pexels.com/photos/21424626/pexels-photo-21424626.jpeg" width={200} height={200} alt='iphone' className=' image h-full w-full  object-cover' />
                </div>
                <div className='rounded-xl overflow-hidden   lg:h-[70vh] h-[40vh] w-full   '>
                    <Image src="https://images.pexels.com/photos/10095767/pexels-photo-10095767.jpeg" width={200} height={200} alt='iphone' className=' image h-full w-full  object-cover' />
                </div>

            </div>


        </SectionLayout >
    );
}

export default SustainabilityHighlight;