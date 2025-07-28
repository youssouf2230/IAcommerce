'use client'
import React from 'react';
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
const ChatAnimatedText = () => {

    useGSAP(() => {
        const tl = gsap.timeline();

        
        tl.from('.text',
            {
                x: -50,
                opacity: 0,
                 duration: 0.6,
                ease: 'power2.out',
                delay: 2, // Delay before start
            },
           
        );

    
        tl.to('.text', {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: 3, // Delay after first tween
            zIndex: -1,
            display: 'none'
        });
    });

    return (
        

            <p className='  text left-0 w-full text-sm bg-zinc-200 text-zinc-700   py-2 px-5 rounded-tr-xs mr-1.5 rounded-lg  block h-max translate-y-4 '>Ask chat bot ?</p>
      
    );
}

export default ChatAnimatedText;
