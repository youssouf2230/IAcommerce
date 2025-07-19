'use client'
import Image from 'next/image';
import React, { useRef } from 'react';
import { Button } from '../ui/button';
import { Clock3, Truck } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const heroImage = 'https://resource.logitech.com/w_544,h_466,ar_7:6,c_pad,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/g935/g935-gallery-2.png'

const HeroSection = () => {
    const animationRef = useRef(null);
    const imageRef = useRef(null);
    const textRef = useRef(null);

    useGSAP(() => {
        // Initial animations
        gsap.from('.animate', {
            y: -20,
            filter: 'blur(8px)',
            stagger: 0.1,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        });

        // ScrollTrigger animation for image going behind text

        gsap.to(imageRef.current, {
            y: 200,
            scale: 1.2,
            duration: 10,


            scrollTrigger: {
                trigger: animationRef.current,
                start: "center center",
                end: "bottom bottom",
                
                scrub: 1,

                markers: false, // Set to true for debugging
            }
        });

        // ScrollTrigger animation for text overlay
        gsap.to(textRef.current, {
            y: -50,
            scale: 1.1,
            scrollTrigger: {
                trigger: animationRef.current,
                start: "top top",
                end: "bottom center",
                scrub: 1,
                markers: false,
            }
        });

        // Alternative: You can also animate the text div to come forward


    }, { scope: animationRef });

    return (
        <section ref={animationRef} className="w-full px-4 py-20 md:py-28 bg-background text-center relative ">
            <div className="max-w-3xl mx-auto space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight md:leading-18 animate">
                    Your One-Stop Shop for Everything Tech
                </h1>
                <p className="text-muted-foreground text-base md:text-lg animate">
                    Discover premium products at competitive prices, with fast shipping and exceptional customer service.
                </p>

                <div className="flex animate justify-center items-center gap-4">
                    <Button size="lg">Shop Now</Button>
                    <Button size="lg" variant="outline">View Showcase</Button>
                </div>

                <div className="mt-6 animate m-auto w-fit text-sm text-muted-foreground flex flex-col sm:flex-row justify-center gap-4">
                    <span className='flex gap-2'> <Truck size={18} /> Free shipping over $50</span>
                    <span className='flex gap-2'> <Clock3 size={18} /> 24/7 Customer Support</span>
                </div>
            </div>

            <div ref={animationRef}>

                {/* Image Container */}
                <div ref={imageRef} className='m-auto w-fit z-10 relative '>
                    <Image
                        src={heroImage}
                        className="w-2xl animate"
                        alt="Hero"
                        width={1500}
                        height={1500}
                    />
                </div>

                {/* Text Overlay */}
                <div ref={textRef} className='bg-secondary/25 backdrop-blur-3xl md:text-[2.4rem] text-2xl rounded-md text-foreground/90 md:leading-18 leading-12 z-20 p-7 py-20 relative'>
                    Discover next-generation electronics designed for powerful performance, sleek style, and everyday reliability — wherever life takes you.
                </div>
            </div>
        </section>
    );
}

export default HeroSection;