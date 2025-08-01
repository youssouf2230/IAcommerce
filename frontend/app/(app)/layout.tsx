import { Footer } from '@/components/layout/footer'
import Header from '@/components/layout/header'
import ChatBot from '@/components/shared/chat-bot'
import React from 'react'

export default function layout({ children }: { children: React.ReactElement }) {
    return (
        <div className='min-h-screen sm:px-10  lg:px-14 py-4 px-7  '>
            <Header />
            <div className=' '>
                {children}
            </div>
            <ChatBot/>
            <Footer />
        </div>
    )
}