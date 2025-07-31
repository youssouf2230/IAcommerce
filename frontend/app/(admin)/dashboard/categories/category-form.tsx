"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addCategory, CategoryFormState } from "./category-actions";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { SubmitButton } from "@/components/shared/submit-button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Category } from "@/types";



export function CategoryForm({ children,className, category }: { children: React.ReactNode ,className?:string; category?: Category }) {
    const initialState: CategoryFormState = null;
    const [state, formAction, isPending] = useActionState(addCategory, initialState);
    const [isOpen, setIsOpen] = useState(false);
   

    useEffect(() => {
        if (state?.success) {
            
            setIsOpen(false);
        }
    }, [state]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild className={cn("h-full",className)}>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl my-3">Add Category</DialogTitle>

                </DialogHeader>
                <form  action={formAction} className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" placeholder="phone, laptop..." defaultValue={category?.name} />
                        {/* FIX: Display validation errors for the name field */}
                        {state?.errors?.name && (
                            <p className="text-sm text-red-500">{state.errors.name[0]}</p>
                        )}
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="image">Upload Image</Label>
                        <Input id="image" name="image" type="file" accept="image/*"  />
                        {/* FIX: Display validation errors for the image field */}
                        {state?.errors?.image && (
                            <p className="text-sm text-red-500">{state.errors.image[0]}</p>
                        )}
                        <Image
                            src={category?.urlImage as string}
                            alt={category?.name as string}
                            width={150}
                            height={150}
                            className="object-contain flex-1 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ease-in-out"
                        />
                    </div>

                    <DialogFooter>
                        {/* FIX: The DialogClose button should not submit the form */}
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>

                        <SubmitButton pending={isPending}>
                            Save
                        </SubmitButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}