'use client';
import { SlidingNumber } from '@/components/ui/sliding-number';
import { useEffect, useState } from 'react';
import { noPaginasSliderNanoStore } from '@/nanostores';

interface Props { text: string; }

export default function SlidingNumberWithSlider(props: Props) {
    const [value, setValue] = useState(noPaginasSliderNanoStore.get());
    const [width, setWidth] = useState(0);

    useEffect(() => {
        // This takes place only on the slider directly
        noPaginasSliderNanoStore.set(value);
        // This susbscribe is for whenever the value changes outside the slider
        const unsubscribe = noPaginasSliderNanoStore.subscribe((value) => {
            setValue(value);
        });
        // Prevent memory leak
        return unsubscribe;
    }, [value]);

    return (
        <div className='flex flex-col items-start gap-0 text-lg mr-4 text-neutral-700 dark:text-neutral-100'>
            <div className='flex items-center gap-2'>{props.text}</div>
            <div className='inline-flex items-center gap-1 leading-none'>
                <SlidingNumber value={value} />
            </div>
            <input
                type='range'
                value={value}
                min={50}
                max={1500}
                step={10}
                onChange={(e) => setValue(+e.target.value)}
                className='mt-2 w-full accent-orange-900 cursor-(--cursorPointer) '
            />
        </div>
    );
}