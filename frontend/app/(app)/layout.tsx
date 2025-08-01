import { Footer } from '@/components/layout/footer'
import Header from '@/components/layout/header'
import ChatBot from '@/components/shared/chat-bot'
import { CartProvider } from '@/hooks/use-cart'
import React from 'react'

export default function layout({ children }: { children: React.ReactElement }) {
    return (
        <div className='min-h-screen sm:px-10  lg:px-14 py-4 px-7  '>
            <CartProvider>

                <Header />
                <div className=' '>
                    {children}
                </div>
            </CartProvider>
            <ChatBot />
            <Footer />
        </div>
    )
}