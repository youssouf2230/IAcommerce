import React from 'react';

const Layouts = ({children}: {children: React.ReactNode}) => {
    return (
        <div>
            sidebar
            header
           {children} 
        </div>
    );
}

export default Layouts;
