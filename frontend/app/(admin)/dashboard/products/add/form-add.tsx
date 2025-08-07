'use client';

import React, { useActionState, useState } from 'react';
import { Button } from '@/components/ui/button';
import InputForm from '@/components/dashboard/Input-form';
import SelectForm from '@/components/dashboard/SelectForm';
import { createProduct } from '@/actions/product-actions';
import UploadImages from './upload-images';
import { Category } from '@/types';

export type ProductFormState = {
    success?: boolean;
    message?: string;
    errors?: {
        properties?: {
            name?: { errors: string[] };
            purchasePrice?: { errors: string[] };
            sellPrice?: { errors: string[] };
            oldPrice?: { errors: string[] };
            stockQuantity?: { errors: string[] };
            categoryId?: { errors: string[] };
            // description retiré
        };
        imageUrls?: string[];
        error?: string[];
    };
};

const ProductForm = ({ categories }: { categories: Category[] }) => {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const [state, handleSubmit, pending] = useActionState(
        async (_prev: ProductFormState, formData: FormData) => {
            uploadedFiles.forEach((file) => {
                formData.append('imageUrls', file);
            });
            const result = await createProduct(null, formData);
            return result;
        },
        {
            success: false,
            message: '',
            errors: {},
        }
    );

    return (
        <form id="product-form" action={handleSubmit} className="space-y-4 p-6">
            <InputForm
                label="Product Name"
                id="name"
                name="name"
                error={state?.errors?.properties?.name?.errors[0]}
            />
            <InputForm
                label="Purchase Price"
                id="purchasePrice"
                name="purchasePrice"
                type="number"
                min={0}
                defaultValue={0}
                error={state?.errors?.properties?.purchasePrice?.errors[0]}
            />
            <InputForm
                label="Sell Price"
                id="sellPrice"
                name="sellPrice"
                min={0}
                defaultValue={0}
                type="number"
                step="0.01"
                error={state?.errors?.properties?.sellPrice?.errors[0]}
            />
            <InputForm
                label="Old Price"
                id="oldPrice"
                name="oldPrice"
                min={0}
                defaultValue={0}
                type="number"
                step="0.01"
                error={state?.errors?.properties?.oldPrice?.errors[0]}
            />
            <InputForm
                label="Stock Quantity"
                type="number"
                min={0}
                id="stockQuantity"
                name="stockQuantity"
                error={state?.errors?.properties?.stockQuantity?.errors[0]}
            />
            <SelectForm
                label="Category"
                id="categoryId"
                name="categoryId"
                options={categories}
                error={state?.errors?.properties?.categoryId?.errors[0]}
            />

            <UploadImages onFilesChange={setUploadedFiles} />

            {state?.errors && (
                <p className="text-sm text-red-500">{state?.errors?.error}</p>
            )}
            {state?.success && (
                <p className="text-sm text-green-500">{state.message}</p>
            )}

            <Button type="submit" disabled={pending}>
                {pending ? 'Creating Product...' : 'Create Product'}
            </Button>
        </form>
    );
};

export default ProductForm;
