'use client';
import { Marquee, MarqueeContent, MarqueeItem } from '@/components/ui/shadcn-io/marquee';
import Image from 'next/image';

const electronicsLogos = [
  { name: "Apple", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/800px-Apple_logo_black.svg.png" },
  { name: "Samsung", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Samsung_logo_blue.png/1200px-Samsung_logo_blue.png?20200102205331" },
  { name: "Logitech", url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Logitech_logo.png?20160224082055" },
  { name: "Playstation", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Samsung_logo_blue.png/1200px-Samsung_logo_blue.png?20200102205331" },
  { name: "Lenovo", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Lenovo_%282015%29.svg/640px-Lenovo_%282015%29.svg.png" }
];

const CompanyMarquee = () => (
<div className='my-20'>
  <h1 className='text-4xl font-semibold mb-8 text-center'>Top Electronics Brands</h1>
  <Marquee>
    <MarqueeContent>
      {electronicsLogos.map((comp, index) => (
          <MarqueeItem key={index} className="flex items-center justify-center h-max w-52 ">
          <Image
            src={comp.url}
            alt={`${comp.name} logo`}
            width={200}
            height={200}
            className="object-contain size-30 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-200"
            />
        </MarqueeItem>
      ))}
    </MarqueeContent>
  </Marquee>
      </div>
);

export default CompanyMarquee;
