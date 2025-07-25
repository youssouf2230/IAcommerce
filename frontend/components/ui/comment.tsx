import { CommentType } from '@/types';
import React from 'react';
import { Rating } from '../product/product-card';


const Comment = ({ comment }: { comment: CommentType }) => {
  return (
    <div>

      <div className='flex items-center gap-2.5 text-lg mb-3'>
        <div className='rounded-full uppercase text-base  aspect-square size-10 flex justify-center items-center font-medium bg-muted-foreground text-zinc-50 '>
          {comment.authorName[0] + comment.authorName[1]}
        </div>
        <h1 className='font-medium '>
          {comment.authorName}
        </h1>
      </div>
      <p className='px-10 max-w-3xl text-foreground/60'>
        {comment.content}
      </p>
      <div className='px-10'>

        <Rating rating={comment.rating} />
      </div>


    </div>
  );
}

export default Comment;
