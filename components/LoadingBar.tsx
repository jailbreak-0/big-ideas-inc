"use client";

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function LoadingBarInner() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Start loading
        setIsLoading(true);
        setProgress(20);

        // Simulate progressive loading
        const timer1 = setTimeout(() => setProgress(40), 100);
        const timer2 = setTimeout(() => setProgress(60), 300);
        const timer3 = setTimeout(() => setProgress(80), 600);

        // Complete loading
        const completeTimer = setTimeout(() => {
            setProgress(100);
            setTimeout(() => {
                setIsLoading(false);
                setProgress(0);
            }, 200);
        }, 800);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(completeTimer);
        };
    }, [pathname, searchParams]);

    if (!isLoading && progress === 0) return null;

    return (
        <div
            className="absolute bottom-0 left-0 right-0 h-1 bg-transparent pointer-events-none"
            style={{ height: '2px' }}
        >
            <div
                className="h-full bg-linear-to-r from-primary via-blue-500 to-primary transition-all duration-300 ease-out shadow-lg shadow-primary/50"
                style={{
                    width: `${progress}%`,
                    transition: progress === 100 ? 'width 200ms ease-out' : 'width 300ms ease-out',
                }}
            />
        </div>
    );
}

export default function LoadingBar() {
    return (
        <Suspense fallback={null}>
            <LoadingBarInner />
        </Suspense>
    );
}
