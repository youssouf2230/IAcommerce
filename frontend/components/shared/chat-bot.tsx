/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Bot, X } from 'lucide-react';
import React, { useRef, useState, useEffect } from 'react';
import ChatAnimatedText from './chat-animated-text';
import ChatBotForm from './chat-bot-form';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ChatBot = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const chatBoxRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    useGSAP(
        () => {
            const tl = gsap.timeline({ paused: true });

            tl.to(chatBoxRef.current, {
                y: 0,
                opacity: 1,
                visibility: 'visible',
                duration: 0.4,
                ease: 'power3.out',
            });

            tl.to(
                '.chat-open-icon',
                { scale: 0, opacity: 0, duration: 0.2, ease: 'power2.in' },
                '<'
            );
            tl.to(
                '.chat-close-icon',
                { scale: 1, opacity: 1, duration: 0.2, ease: 'power2.out' },
                '-=0.1'
            );

            (containerRef.current as any).timeline = tl;
        },
        { scope: containerRef }
    );

    useEffect(() => {
        const timeline = (containerRef.current as any).timeline as gsap.core.Timeline;
        if (timeline) {
            if (isOpen) {
                timeline.play();
            } else {
                timeline.reverse();
            }
        }
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };


        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        console.log('cleanup1');
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [isOpen]);




    const toggleChat = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div
            ref={containerRef}
            className="fixed z-50 sm:max-w-md max-w-sm w-full  bottom-5 right-4 flex flex-col items-end"
        >
            <div
                ref={chatBoxRef}
                style={{ transform: 'translateY(50px)' }}
                className="opacity-0 invisible w-full "
                id="chatbox"
            >
                <ChatBotForm className="shadow-2xl rounded-lg" />
            </div>

            <div className="relative flex items-center mt-3">
                {!isOpen && <ChatAnimatedText />}

                <button
                    onClick={toggleChat}
                    className="relative cursor-pointer transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aspect-square rounded-full shadow-2xl size-14 bg-primary flex items-center justify-center"
                >
                    <Bot className="chat-open-icon text-muted size-7 absolute" />
                    <X className="chat-close-icon text-muted size-7 absolute scale-0 opacity-0" />
                </button>
            </div>
        </div>
    );
};

export default ChatBot;
