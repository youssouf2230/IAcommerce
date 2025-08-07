'use client'
import React, {useTransition } from 'react';
import { CheckCircle } from 'lucide-react';
import { OrderStatus } from '@/types';
import { updateStatus } from '@/actions/order-action';
import { SubmitButton } from '../shared/submit-button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const UpdateStatusBtn = ({ status,OrderId, className }: { status: OrderStatus , OrderId: number,className?:string}) => {

  const [isPending, startTransition] = useTransition()

     const handleClick = () => {
        startTransition(async () => {
         const res=   await updateStatus(OrderId,status);
         toast.success(res.message)
        });
    };
    return (
        <SubmitButton pending={isPending} onClick={handleClick} variant="success" className={cn("w-full h-8 justify-start ",className)} >
               <CheckCircle className="size-4 text-inherit " /> Confirm Order
        </SubmitButton>
    );
}

export default UpdateStatusBtn;
