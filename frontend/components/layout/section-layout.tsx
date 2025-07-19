import React from 'react';
type SectionLayoutProps = {
    children: React.ReactNode,
    title: string,
    description: string,
}
const SectionLayout = ({ children, title, description }: SectionLayoutProps) => {
    return (
        <div className='mt-30'>
            <div className='flex flex-col mb-10 gap-2'>
                <h1 className='text-4xl font-semibold '> {title} </h1>
                <p className='text-muted-foreground '>{description}</p>
            </div>
            {children}
        </div>
    );
}

export default SectionLayout;
