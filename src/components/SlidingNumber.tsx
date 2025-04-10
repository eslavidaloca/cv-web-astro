'use client';
import { SlidingNumber } from '@/components/ui/sliding-number';
import { useState } from 'react';

interface Props { text: string; }
export default function SlidingNumberWithSlider(props: Props) {
    const [value, setValue] = useState(1500);
    const [width, setWidth] = useState(0);

    return (
        <div className='flex flex-col items-start gap-0'>
            <div className='flex items-center gap-2 font-mono'>{props.text}</div>
            <div className='inline-flex items-center gap-1 font-mono leading-none'>
                <SlidingNumber value={value} />
            </div>
            <input
                type='range'
                value={value}
                min={500}
                max={1500}
                step={10}
                onChange={(e) => setValue(+e.target.value)}
                className='mt-2 w-full accent-orange-900'
            />
        </div>
    );
}
