'use client'
import React from 'react';
import SectionLayout from '../layout/section-layout';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);
const LatestSections = () => {

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
        <SectionLayout title='Latest' description='Check out our latest products'>

            <div className='grid grid-cols-3 gap-10'>
                <div className=' rounded-xl overflow-hidden border h-[80vh] w-full    '>
                    <Image src="https://images.pexels.com/photos/11031586/pexels-photo-11031586.jpeg" width={200} height={200} alt='iphone' className=' image h-full w-full object-cover' />
                </div>
                <div className='rounded-xl overflow-hidden border   h-[80vh] w-full   '>
                    <Image src="https://images.pexels.com/photos/21424626/pexels-photo-21424626.jpeg" width={200} height={200} alt='iphone' className=' image h-full w-full  object-cover' />
                </div>
                <div className='rounded-xl overflow-hidden border   h-[80vh] w-full   '>
                    <Image src="https://images.pexels.com/photos/10095767/pexels-photo-10095767.jpeg" width={200} height={200} alt='iphone' className=' image h-full w-full  object-cover' />
                </div>

            </div>

        </SectionLayout>
    );
}

export default LatestSections;
