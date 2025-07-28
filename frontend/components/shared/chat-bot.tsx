'use client';

import { Bot, X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import ChatBotForm from './chat-bot-form';
import ChatAnimatedText from './chat-animated-text';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  // Close chat if clicked outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="fixed   z-50 sm:max-w-md max-w-sm w-max bottom-5 right-4 flex flex-col items-end"
    >
      {isOpen && (
        <div className="shadow-2xl rounded-lg w-full mb-3">
          <ChatBotForm />
        </div>
      )}

      <div className="relative flex items-center  ">
        {!isOpen && <ChatAnimatedText  />}

        <button
          onClick={toggleChat}
          className="relative cursor-pointer transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aspect-square rounded-full shadow-2xl size-14 bg-primary flex items-center justify-center"
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          {!isOpen ? (
            <Bot className="text-muted size-7" />
          ) : (
            <X className="text-muted size-7" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
