/* eslint-disable @typescript-eslint/no-explicit-any */
// ProductForm.tsx (or your component's file name)

'use client';

import React, { useActionState, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import InputForm from '@/components/dashboard/Input-form';
import TextareaForm from '@/components/dashboard/textarea-form';
import SelectForm, { Option } from '@/components/dashboard/SelectForm';

// Import your new server action
import { createProduct } from '@/app/actions/product-actions';
import UploadImages from './upload-images';
import { Category } from '@/types';



// ProductForm.tsx

const ProductForm = ({categories}:{categories:Category[]}) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  const [state, handleSubmit, pending] = useActionState(
    async (_prev: any, formData: FormData) => {
      // Append uploaded files to formData
    
      
      uploadedFiles.forEach((file) => {
        formData.append('imageUrls', file);
      });
   

      const result = await createProduct(null, formData);
      console.log(result)
      return result;
    },
    null
  );

  return (
    <form id="product-form" action={handleSubmit} className="space-y-4 p-6">
      {/* Form Inputs */}
      <InputForm label="Product Name" id="name" name="name"  error={state?.errors?.properties.name?.errors[0]}/>
      <InputForm label="Purchase Price" id="purchasePrice" name="purchasePrice" type="number" min={0} defaultValue={0} error={state?.errors?.properties?.purchasePrice?.errors[0]} />
      <InputForm label="Sell Price" id="sellPrice" name="sellPrice" min={0}  defaultValue={0} type="number" step="0.01" />
      <InputForm label="Old Price" id="oldPrice" name="oldPrice" min={0} defaultValue={0} type="number" step="0.01" />
      <InputForm label="Stock Quantity" type="number" min={0} id="stockQuantity" name="stockQuantity" />
      <TextareaForm label="Description" id="description" name="description" />
      <SelectForm label="Category" id="categoryId" name="categoryId" options={categories } />

      {/* Remove this: <InputForm type="file" /> */}

      <UploadImages onFilesChange={setUploadedFiles} />

      {/* Feedback
      {state?.error && <p className="text-sm text-red-500">{state?.error/.message}</p>}
      {state?.success && <p className="text-sm text-green-500">{state.message}</p>} */}

      <Button type="submit" disabled={pending}>
        {pending ? 'Creating Product...' : 'Create Product'}
      </Button>
    </form>
  );
};

export default ProductForm;