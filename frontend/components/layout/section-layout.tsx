import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
type SectionLayoutProps = {
    children: React.ReactNode,
    title?: string,
    description?: string,
    explore?: boolean
    className?: string
}
const SectionLayout = ({ children, title, description, explore= true, className }: SectionLayoutProps) => {
    return (
        <div className= {cn("mt-30",className)} >
            <div className='flex justify-between   sm:items-center items-end max-sm:mb-10'>
                <div className='flex flex-col mb-10 gap-2 w-full '>
                    <h1 className='sm:text-4xl text-3xl font-semibold  '> {title} </h1>
                    <p className='text-muted-foreground '>{description}</p>
                </div>
                {explore && (
                    <Button variant="outline" className='group'>
                        Explore More <ArrowRight className=' group-hover:translate-x-1 transition-all duration-300'  />
                    </Button>
                )}
            </div>

            {children}
        </div>
    );
}

export default SectionLayout;
