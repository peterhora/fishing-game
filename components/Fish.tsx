import React, { useEffect, useRef } from 'react';
import type { FishData } from '../types';
import { PIXEL_FISH_DATA } from '../constants';

interface FishProps {
    fish: FishData;
    isCorrect: boolean;
}

const PIXEL_SIZE = 1; // Very small pixels for maximum detail

const Fish: React.FC<FishProps> = ({ fish, isCorrect }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { spriteIndex } = fish;
    const fishArt = PIXEL_FISH_DATA[spriteIndex % PIXEL_FISH_DATA.length];
    const { pixels, palette } = fishArt;

    const canvasWidth = pixels[0].length * PIXEL_SIZE;
    const canvasHeight = pixels.length * PIXEL_SIZE;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas before drawing
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        // Draw each pixel
        pixels.forEach((row, y) => {
            row.forEach((colorIndex, x) => {
                if (colorIndex > 0) { // colorIndex 0 is transparent
                    ctx.fillStyle = palette[colorIndex];
                    ctx.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
                }
            });
        });

    }, [spriteIndex, pixels, palette, canvasWidth, canvasHeight]);

    const animationClass = isCorrect
    ? 'animate-[jump_1s_ease-in-out_infinite]'
    : 'animate-[float_4s_ease-in-out_infinite]';

    return (
        <div
            className={`m-1 transition-transform duration-500 ${animationClass}`}
            style={fish.style}
        >
            <canvas
                ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
                className="drop-shadow-md"
            />
        </div>
    );
};

// Add custom keyframes to Tailwind's style definitions
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) scaleX(var(--tw-scale-x, 1)); }
        50% { transform: translateY(-10px) scaleX(var(--tw-scale-x, 1)); }
    }
    @keyframes jump {
        0%, 100% { transform: translateY(0) rotate(0deg) scaleX(var(--tw-scale-x, 1)); }
        25% { transform: translateY(-20px) rotate(-10deg) scaleX(var(--tw-scale-x, 1)); }
        50% { transform: translateY(0) rotate(0deg) scaleX(var(--tw-scale-x, 1)); }
        75% { transform: translateY(-20px) rotate(10deg) scaleX(var(--tw-scale-x, 1)); }
    }
`;
document.head.append(style);

export default Fish;
