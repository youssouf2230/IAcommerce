"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addCategory, updateCategory, CategoryFormState } from "../../actions/category-actions";
import { useActionState, useEffect, useState } from "react";
import { SubmitButton } from "@/components/shared/submit-button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Category } from "@/types";

export function CategoryForm({
    children,
    className,
    category,
}: {
    children: React.ReactNode;
    className?: string;
    category?: Category;
}) {
    const initialState: CategoryFormState = null;

    const [stateAdd, formActionAdd, isPendingAdd] = useActionState(addCategory, initialState);
    const [stateUpdate, formActionUpdate, isPendingUpdate] = useActionState(updateCategory, initialState);

    const [isOpen, setIsOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const isEditing = !!category;
    const state = isEditing ? stateUpdate : stateAdd;
    const isPending = isPendingAdd || isPendingUpdate;

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (state?.success) {
            setIsOpen(false);
            setImagePreview(null);
        }
    }, [state]);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) {
                    setImagePreview(null);
                }
            }}
        >
            <DialogTrigger asChild className={cn("h-full", className)}>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl my-3">{isEditing ? "Edit Category" : "Add Category"}</DialogTitle>
                </DialogHeader>
                <form action={isEditing ? formActionUpdate : formActionAdd} className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" placeholder="phone, laptop..." defaultValue={category?.name} />
                        {state?.errors?.name && (
                            <p className="text-sm text-red-500">{state.errors.name[0]}</p>
                        )}
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="image">Upload Image</Label>
                        <Input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} />
                        {isEditing && (
                            <Input id="id" name="id" type="hidden" defaultValue={category.id} />
                        )}
                        {state?.errors?.image && (
                            <p className="text-sm text-red-500">{state.errors.image[0]}</p>
                        )}
                        {(imagePreview || category?.urlImage) && (
                            <Image
                                src={imagePreview ?? (category?.urlImage as string)}
                                alt={category?.name || "Category image"}
                                width={150}
                                height={150}
                                className="object-contain flex-1 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ease-in-out"
                            />
                        )}
                    </div>

                    <DialogFooter>
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
