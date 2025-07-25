'use client';

import React, { useState, useEffect } from 'react';
import { Textarea } from '../ui/textarea';
import { SubmitButton } from './submit-button';
import { SendHorizonal } from 'lucide-react';
import Comment from '../ui/comment';
import { CommentProps } from "@/components/types";
import axios from 'axios';

const CommentsUser = ({ productId }: { productId: number }) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Charger les commentaires au chargement du composant
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/comments/product/${productId}`);
        setComments(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des commentaires :", error);
      }
    };

    fetchComments();
  }, [productId]);

  const handleSubmit = async () => {
    if (!commentText.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/comments', {
        content: commentText,
        authorName: 'anonymous',
        user: null,
        product: { id: productId }
      });


      const newComment = response.data; // backend renvoie le commentaire créé
      setComments([newComment, ...comments]);
      setCommentText('');
    } catch (err) {
      console.error("Erreur lors de l'envoi :", err);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className='md:p-10 lg:p-20'>
        <h1 className='my-10 text-3xl font-medium'>
          Comments <span className='text-2xl text-zinc-300'> ({comments.length}) </span>
        </h1>

        <div className='bg-muted/50 rounded-2xl p-6'>
          <div className='grid grid-cols-1 gap-8'>
            {comments.map((c, index) => (
                <Comment key={index} comment={c.content} username={c.authorName}  />
            ))}
          </div>

          <div className='mx-10 my-8 border relative'>
            <Textarea
                className='h-36 resize-none placeholder:text-base text-base'
                placeholder='Add a comment'
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
            />
            <SubmitButton
                size="sm"
                className='absolute bottom-3 right-4'
                disabled={loading}
                onClick={handleSubmit}
            >
              <SendHorizonal size={10} className='size-4' />
            </SubmitButton>
          </div>
        </div>
      </div>
  );
};

export default CommentsUser;
