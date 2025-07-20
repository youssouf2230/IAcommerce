/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import React, { JSX, useRef } from 'react';
import { Button } from '../ui/button';
import { Clock3, Truck } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { category } from '../data/categories';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, JSX.Element> = {
  Truck: <Truck size={18} />,
  Clock3: <Clock3 size={18} />,
};

// Predefined positions for category items (12 positions)
const categoryPositions = [
  { side: 'left', left: '20px', top: '80px' },
  { side: 'right', right: '100px', top: '100px' },
  { side: 'left', left: '120px', top: '140px' },
  { side: 'right', right: '30px', top: '260px' },
  { side: 'left', left: '40px', top: '320px' },
  { side: 'right', right: '170px', top: '230px' },
  { side: 'left', left: '140px', top: '280px' },
  { side: 'right', right: '40px', top: '420px' },
  { side: 'left', left: '80px', top: '410px' },
  { side: 'right', right: '130px', top: '350px' },
  { side: 'left', left: '110px', top: '520px' },
  { side: 'right', right: '60px', top: '520px' },
];

const HeroSection = () => {
  const t = useTranslations('HeroSection');
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
      ease: 'power2.out',
    });

    // Animate category items with predefined positions
    gsap.set('.category-item', {
      opacity: 0,
      scale: 0.8,
    });

    gsap.to('.category-item', {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.7)',
      delay: 0.5,
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
      },
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
      },
    });
    gsap.utils.toArray('.category-item').forEach((item: any) => {
      gsap.to(".category-item", {
        y: 50,
        filter: 'blur(4px)',

        x: () => gsap.utils.random(-40, 40),

        scrollTrigger: {
          trigger: ".category-item",
          start: "top top",
          end: "bottom center",
          scrub: 1,

        },
      })
    });


  }, { scope: animationRef });

  return (
    <section ref={animationRef} className="w-full px-4 pt-20 bg-background text-center relative">
      <div className="max-w-3xl mx-auto">

        <div className=' space-y-6 relative z-50   max-lg:bg-background/50  max-lg:backdrop-blur-md rounded-2xl p-6  ' >

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight md:leading-18 animate">
            {t('title')}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg animate">
            {t('subtitle')}
          </p>

          <div className="flex animate justify-center items-center gap-4">
            <Button size="lg">{t('ctaPrimary.text')}</Button>
            <Button size="lg" variant="outline">{t('ctaSecondary.text')}</Button>
          </div>

          <div className="mt-6 animate m-auto w-fit text-sm text-muted-foreground flex flex-col sm:flex-row justify-center gap-4">
            {t.raw('highlights').map((item: any, index: number) => (
              <span className="flex gap-2" key={index}>
                {iconMap[item.icon]} {item.text}
              </span>
            ))}
          </div>
        </div>
        {/* Category items with predefined positions */}
        {category.map((item, index) => {
          // Get position from predefined array, cycle through if more categories than positions
          const position = categoryPositions[index % categoryPositions.length];

          const positionStyle = position.side === 'left'
            ? { left: position.left, top: position.top }
            : { right: position.right, top: position.top };

          return (
            <div
              key={index}
              className="category-item w-fit dark:bg-neutral-800  bg-accent rounded-full p-3 absolute "
              style={positionStyle}
            >
              <Image
                src={item.image}
                alt={item.category}
                width={40}
                height={40}
                className="object-contain size-16"
              />
            </div>
          );
        })}
      </div>

      <div>
        <div ref={imageRef} className="m-auto w-fit z-10 relative">
          <Image
            src="https://resource.logitech.com/w_544,h_466,ar_7:6,c_pad,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/g935/g935-gallery-2.png"
            className="w-2xl animate"
            alt="Hero"
            width={1500}
            height={1500}
          />
        </div>

        <div
          ref={textRef}
          className="bg-secondary/25 backdrop-blur-2xl md:text-[2.5rem] font-medium text-2xl rounded-md text-foreground/90 md:leading-18 leading-12 z-20 px-7 py-20 relative"
        >
          {t('overlayText')}
          {/* <Image src="https://images.pexels.com/photos/28706295/pexels-photo-28706295.jpeg" alt="Logo" width={30}  height={30}  className='rounded-4xl rotate-90' /> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;