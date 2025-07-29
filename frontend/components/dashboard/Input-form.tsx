'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type InputFormProps = {
    label?: string;
    error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>; // Inherit all native <input> props

const InputForm = ({ label, error, id, ...props }: InputFormProps) => {
    return (
        <div className="flex flex-col gap-2 relative pb-4">
            {label && <Label htmlFor={id}>{label}</Label>}
            <Input id={id} {...props} />
            {error && (
                <p className="text-destructive/70 text-sm absolute bottom-0">{error}</p>
            )}
        </div>
    );
};

export default InputForm;
