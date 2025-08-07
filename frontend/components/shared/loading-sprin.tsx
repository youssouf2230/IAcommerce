import { LoaderCircle } from 'lucide-react';
import React from 'react';

const LoadingSpin = () => {
    return (
        <div className="flex items-center justify-center h-[80vh] overflow-hidden animate-spin">
            <LoaderCircle size={80} className="text-primary" />
        </div>
    );
}

export default LoadingSpin;
