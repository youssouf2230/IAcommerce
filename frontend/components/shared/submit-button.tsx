'use client';


import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import React from 'react';


type SubmitButtonProps = {
    pending?: boolean;
} & React.ComponentPropsWithoutRef<typeof Button>;

export function SubmitButton({ children, pending, ...props }: SubmitButtonProps) {


    return (
        <Button {...props} type="submit" disabled={pending || props.disabled}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </Button>
    );
}