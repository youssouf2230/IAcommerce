'use client';

import React, {  useState } from 'react';
import { useNavigationLinks } from '../../hooks/useNavigation';
import Link from 'next/link';
import HumButton from '../ui/hum-button';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MobileMenu = () => {

    const [isOpen, setIsOpen] = useState(false);
    const navigationLinks = useNavigationLinks();

    // Animate list items on mount
  useGSAP(() => {
    if (isOpen) {
        // Opening animations
        gsap.set('.parent', { width: 0 }); // Start from 0
        gsap.to('.parent', {
            duration: 0.4,
            width: '100%',
        });
        
        gsap.fromTo('.list', {
            y: -20,
            filter: 'blur(8px)',
            opacity: 0,
        }, {
            y: 0,
            filter: 'blur(0px)',
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out',
            delay: 0.2, // Start after parent animation
        });
    } else {
        // Closing animations
        gsap.to('.list', {
            y: 20,
            filter: 'blur(8px)',
            opacity: 0,
            stagger: 0.05,
            duration: 0.3,
            ease: 'power2.in',
        });
        
        gsap.to('.parent', {
            duration: 0.4,
            width: 0,
            delay: 0.2, // Start after list items fade out
        });
    }
}, [isOpen]);



    return (
        <div className='md:hidden'>
            <HumButton onClick={() => setIsOpen(!isOpen)} />

            {isOpen && (
                <div

                    className='absolute h-full bg-muted z-99 w-full top-0 left-0 py-5 px-7 parent '
                >
                    <Button variant={"ghost"} className='mt-8 mb-20' onClick={() => setIsOpen(!isOpen)} >
                        <X size={100} className='size-18' />
                    </Button>
                    <div className='flex flex-col gap-5'>


                        {navigationLinks.map((link) => (
                            <li key={link.href} className='list list-none text-5xl'>
                                <Link href={link.href}>{link.label}</Link>
                            </li>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MobileMenu;
