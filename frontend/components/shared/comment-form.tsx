// Your original component file
'use client';

import React, { useEffect, useRef } from 'react';
import { useActionState } from 'react'; // In React 18, use: import { useFormState } from 'react-dom';
import { usePathname } from 'next/navigation';

import { Textarea } from '../ui/textarea';
import { SubmitButton } from './submit-button'; // The new, smart submit button
import { User } from '@/types';
import { addComment, FormState } from '@/app/actions/comment-actions';
import { SendHorizonal } from 'lucide-react';

const initialState: FormState = {
  message: '',
  error: null,
};

const CommentForm = ({ user, productId }: { user: User; productId: number }) => {
  const [state, formAction,pending] = useActionState(addComment, initialState);
  const pathname = usePathname(); 
  return (
    <div>
    
      <form  action={formAction} className='mx-10 my-8'>
        <div className='border relative'>
          <Textarea
            name="content" // `name` is crucial for FormData
            className='h-36 resize-none placeholder:text-base text-base'
            placeholder='Add a comment'
          />

          <input type="hidden" name="productId" value={productId} />
          <input type="hidden" name="authorName" value={user.username} />
          <input type="hidden" name="path" value={pathname} />

        
          <SubmitButton onlyLoading pending={pending} className='absolute bottom-3 right-4' >
          <SendHorizonal size={10} className='size-4' />

          </SubmitButton>
        </div>
      </form>

      {state.error && (
        <p className="mx-10 -mt-6 text-sm text-red-500">{state.error}</p>
      )}
    </div>
  );
};

export default CommentForm;