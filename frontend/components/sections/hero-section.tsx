'use client'

import Image from 'next/image';
import React, { JSX, useRef } from 'react';
import { Button } from '../ui/button';
import { Clock3, Truck } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroSection } from '../data/home-page';


gsap.registerPlugin(ScrollTrigger);


const iconMap: Record<string, JSX.Element> = {
    Truck: <Truck size={18} />,
    Clock3: <Clock3 size={18} />,
};

const HeroSection = () => {
    const animationRef = useRef(null);
    const imageRef = useRef(null);
    const textRef = useRef(null);

    useGSAP(() => {
        gsap.from('.animate', {
            y: -20,
            filter: 'blur(8px)',
            stagger: 0.1,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        });

        gsap.to(imageRef.current, {
            y: 200,
            scale: 1.2,
            duration: 10,
            scrollTrigger: {
                trigger: animationRef.current,
                start: "center center",
                end: "bottom bottom",
                scrub: 1,
                markers: false,
            }
        });

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

    }, { scope: animationRef });

    return (
        <section ref={animationRef} className="w-full px-4 pt-20 bg-background text-center relative">
            <div className="max-w-3xl mx-auto space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight md:leading-18 animate">
                    {heroSection.title}
                </h1>
                <p className="text-muted-foreground text-base md:text-lg animate">
                    {heroSection.subtitle}
                </p>

                <div className="flex animate justify-center items-center gap-4">
                    <Button size="lg">{heroSection.ctaPrimary.text}</Button>
                    <Button size="lg" variant="outline">{heroSection.ctaSecondary.text}</Button>
                </div>

                <div className="mt-6 animate m-auto w-fit text-sm text-muted-foreground flex flex-col sm:flex-row justify-center gap-4">
                    {heroSection.highlights.map((item, i) => (
                        <span className="flex gap-2" key={i}>
                            {iconMap[item.icon]} {item.text}
                        </span>
                    ))}
                </div>
            </div>

            {/* Image and overlay */}
            <div>
                <div ref={imageRef} className="m-auto w-fit z-10 relative">
                    <Image
                        src={heroSection.image}
                        className="w-2xl animate"
                        alt="Hero"
                        width={1500}
                        height={1500}
                    />
                </div>

                <div
                    ref={textRef}
                    className="bg-secondary/25 backdrop-blur-3xl md:text-[2.5rem] font-medium text-2xl rounded-md text-foreground/90 md:leading-18 leading-12 z-20 px-7 py-20 relative"
                >
                    {heroSection.overlayText}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
