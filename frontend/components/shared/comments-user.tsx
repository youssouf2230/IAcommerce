import React from 'react';
import { Textarea } from '../ui/textarea';
import { SubmitButton } from './submit-button';
import { SendHorizonal } from 'lucide-react';
import Comment from '../ui/comment';

const CommentsUser = () => {
  return (
    <div className='md:p-10 lg:p-20 '>
      <h1 className='my-10 text-3xl font-medium '>Comments <span className='  text-2xl text-zinc-300 '> (20) </span> </h1>

      <div className=' bg-muted/50 rounded-2xl p-6'>
        <div className='grid grid-cols-1 gap-8'>

          <Comment comment='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo quod hic magnam. Omnis perspiciatis, error amet harum iusto inventore possimus dolores distinctio quos cum quidem, earum nihil nisi, magni vel.' username='Achraf tichirra' />
          <Comment comment='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo quod hic magnam. Omnis perspiciatis, error amet harum iusto inventore possimus dolores distinctio quos cum quidem, earum nihil nisi, magni vel.' username='Achraf tichirra' />

        </div>
        <div className='mx-10 my-8 border relative'>
          <Textarea className='h-36 resize-none placeholder:text-base text-base' placeholder='Add a comment' />
          <SubmitButton size="sm" className='absolute bottom-3 right-4'>
            <SendHorizonal size={10} className='size-4' />
          </SubmitButton>
        </div>

      </div>
    </div>
  );
}

export default CommentsUser;
