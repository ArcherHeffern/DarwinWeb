import React, { useState, useEffect } from 'react';

export default function Loading() {
    const [dots, setDots] = useState('.');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => {
                if (prev === '...') return '.';
                return prev + '.';
            });
        }, 500); // Change dots every 500ms

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            Loading{dots}
        </div>
    );
}