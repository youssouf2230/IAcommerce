import { Button } from '@/components/ui/button';
import { Funnel } from 'lucide-react';
import React from 'react';

const Filter = () => {
    return (
       <div>
                    {/* Future: Sorting dropdown or filters */}
                    <Button className='py-6 rounded-xl'>
                        <Funnel size={20} /> Filter
                    </Button>
                </div>
    );
}

export default Filter;
