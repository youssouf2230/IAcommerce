import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { BotMessageSquare, Copy, SendHorizontal } from 'lucide-react';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';

// Fake static data
const fakeMessages = [
    { from: 'bot', text: 'Hello! How can I help you today?' },
    { from: 'bot', text: 'Why don’t scientists trust atoms? Because they make up everything!' },
    { from: 'user', text: 'Tell me a joke.' },
    // { from: 'bot', text: 'Why don’t scientists trust atoms? Because they make up everything!' },
    // { from: 'user', text: 'Tell me a joke.' },
    // { from: 'bot', text: 'Why don’t scientists trust atoms? Because they make up everything!' },
    // { from: 'user', text: 'Tell me a joke.' },
    // { from: 'bot', text: 'Why don’t scientists trust atoms? Because they make up everything!' },
    // { from: 'user', text: 'Tell me a joke.' },
];

// Dummy copy function
const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
};

const ChatBotForm = ({className}:{className?:string}) => {
   
    return (
        <Card className= {cn("w-full relative  h-[65vh]  overflow-y-auto flex flex-col px-4 ",className)}>
            <div className="flex-1 flex flex-col gap-4">
                {fakeMessages.length === 0 && (
                    <div className="flex flex-row h-[20vh] gap-2 justify-center items-center">
                        <BotMessageSquare className="size-11 text-primary" />
                        <h2 className="mt-2 text-2xl text-zinc-600 font-medium dark:text-footer">
                            How can I help you today?
                        </h2>
                    </div>
                )}

                <div className="flex-1 flex flex-col gap-8 my-5">
                    {fakeMessages.map((msg, index) => (
                        <div
                            key={index}
                            className={`text-sm flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`relative group p-3 rounded-xl w-max max-w-2xl font-medium  ${msg.from === 'user'
                                        ? 'bg-primary/80 text-muted  rounded-tr-xs'
                                        : 'dark:bg-zinc-800 bg-zinc-200/40 dark:text-zinc-50 text-zinc-700 rounded-tl-xs'
                                    }`}
                            >
                                <p className="whitespace-pre-wrap">{msg.text}</p>
                                <Copy
                                    className="text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity ease-in-out cursor-pointer size-4 hover:text-foreground absolute -bottom-5 left-2"
                                    onClick={() => copyToClipboard(msg.text)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Input section (disabled / fake) */}
            <div className="relative w-full items-end">
                <Input
                    placeholder="Ask anything"
                    className="h-11 dark:placeholder:text-zinc-500 placeholder:text-zinc-400 bottom-5 right-8 pr-12"
                    
                    
                />
                <Button
                    size="icon"
                    variant="ghost"
                  
                    className="absolute bottom-1.5 right-2"
                >
                    <SendHorizontal />
                </Button>
            </div>
        </Card>
    );
};

export default ChatBotForm;
