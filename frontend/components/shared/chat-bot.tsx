import { Bot } from 'lucide-react';
import React from 'react';
import ChatAnimatedText from './chat-animated-text';

const ChatBot = () => {
    return (
        <div className='fixed z-999 re  bottom-5 right-4'>
            <div className='relative flex'>

            <ChatAnimatedText/>
            <div className=' flex-1 hover:-rotate-10 transition-transform  aspect-square rounded-full shadow-2xl size-12 bg-primary flex items-center justify-center'>
            <Bot className='text-muted '/>

            </div>
            </div>
        </div>
    );
}

export default ChatBot;
