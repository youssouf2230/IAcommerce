import React from 'react';
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';

const BannerSection = () => {
    return (
        <section className="w-full bg-gradient-to-r from-zinc-800 to-zinc-950 text-white py-16 px-6 mt-20 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold">
                Discover Deals That <span className="text-amber-300">Inspire</span>
            </h1>
            <p className="text-lg sm:text-xl max-w-xl text-zinc-300">
                Shop the latest trends and unbeatable prices. Elevate your lifestyle with just one click.
            </p>
            <Button className="bg-amber-300 text-black hover:bg-yellow-400 transition-colors flex items-center gap-2">
                Start Shopping <ShoppingCart />
            </Button>
        </section>

    );
};

export default BannerSection;
