'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import * as SelectPrimitive from "@radix-ui/react-select"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';

export type Option = {
    id: number;
    name: string;
};

type SelectFormProps = {
    id: string;
    label?: string;
    placeholder?: string;
    value?: string;
    options: Option[];
    error?: string;

} & React.ComponentProps<typeof SelectPrimitive.Root>;

const SelectForm = ({
    id,
    label,
    placeholder = 'Select an option',
    value,
    options,
    error,
    ...props
}: SelectFormProps) => {
    return (
        <div className="flex flex-col gap-2 relative pb-4">
            {label && <Label htmlFor={id}>{label}</Label>}
            <Select value={value} {...props} >
                <SelectTrigger id={id} >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.id} value={option.id.toString() }>
                            {option.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {error && (
                <p className="text-destructive/70 text-sm absolute bottom-0">{error}</p>
            )}
        </div>
    );
};

export default SelectForm;
