import React from 'react';

const Comment = ({username,comment}:{username:string,comment:string}) => {
    return (
         <div>

               <div className='flex items-center gap-2.5 text-lg mb-3'>
                 <div className='rounded-full  aspect-square size-10 flex justify-center items-center font-medium bg-muted-foreground text-zinc-50 '>
                    { username[0] + username[1]}
                 </div>
                   <h1 className='font-medium '>
                   {username}
                   </h1>
               </div>
                <p className='px-10 max-w-3xl text-foreground/60'>
                {comment}
                </p>

             </div>
    );
}

export default Comment;
