import Comment from '../ui/comment';
import axios from 'axios';
import {  getUserSession } from '../auth/auth-data';
import { CommentType, User } from '@/types';
import CommentForm from './comment-form';


const CommentsUser =  async ({ productId }: { productId: number }) => {

  const {user}=  await getUserSession();
  
  const comments = (await axios.get(`http://localhost:8080/api/comments/product/${productId}`)).data as CommentType[];
 


  return (
    <div className='md:p-10 lg:p-20'>
      <h1 className='my-10 text-3xl font-medium'>
        Comments <span className='text-2xl text-zinc-300'> ({comments.length}) </span>
      </h1>

      <div className='bg-muted/50 rounded-2xl p-6'>
        <div className='grid grid-cols-1 gap-8'>
          {comments.map((comment, index) => (
            <Comment key={index} comment={comment }  />
          ))}
        </div>

        <CommentForm   user={user as User} productId={productId} />
      </div>
    </div>
  );
};

export default CommentsUser;
