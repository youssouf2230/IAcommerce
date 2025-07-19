import React from 'react';
import { Button } from './button';

interface HumButtonProps {
  onClick: () => void;

}

const HumButton = ({ onClick,  }: HumButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="group size-8 md:hidden"
      variant="ghost"
      size="default"
     

    >
      <svg
        className="pointer-events-none"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
  
      >
        <path
          d="M4 12L20 12"
          className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-[aria-expanded=true]:translate-y-0 group-[aria-expanded=true]:rotate-[315deg]"
        />
        <path
          d="M4 12H20"
          className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-[aria-expanded=true]:rotate-45"
        />
        <path
          d="M4 12H20"
          className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-[aria-expanded=true]:translate-y-0 group-[aria-expanded=true]:rotate-[135deg]"
        />
      </svg>
    </Button>
  );
};

export default HumButton;
