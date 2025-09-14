import React, { useEffect, useRef } from 'react';

const SkyBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size to full container
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const pixelSize = 4;
        const rows = Math.ceil(canvas.height / pixelSize);
        const cols = Math.ceil(canvas.width / pixelSize);

        // Sky gradient colors (lighter to darker blue)
        const skyColors = ['#87CEEB', '#6BB6FF', '#5BA3D0', '#4A90E2'];
        
        // Cloud colors
        const cloudColors = ['#FFFFFF', '#F0F8FF', '#E6E6FA', '#D3D3D3'];

        // Fill background with sky gradient
        for (let row = 0; row < rows; row++) {
            const ratio = row / rows;
            const colorIndex = Math.floor(ratio * (skyColors.length - 1));
            ctx.fillStyle = skyColors[colorIndex] || skyColors[skyColors.length - 1];
            ctx.fillRect(0, row * pixelSize, canvas.width, pixelSize);
        }

        // Add some pixelated clouds
        const addCloud = (startX: number, startY: number, size: number) => {
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    const x = startX + (i * pixelSize);
                    const y = startY + (j * pixelSize);
                    
                    // Cloud shape pattern (roughly oval)
                    const centerX = size / 2;
                    const centerY = size / 2;
                    const distance = Math.sqrt(Math.pow(i - centerX, 2) + Math.pow(j - centerY, 2));
                    
                    if (distance < size * 0.4 && Math.random() > 0.3) {
                        const cloudColor = cloudColors[Math.floor(Math.random() * cloudColors.length)];
                        ctx.fillStyle = cloudColor;
                        ctx.fillRect(x, y, pixelSize, pixelSize);
                    }
                }
            }
        };

        // Add multiple clouds
        addCloud(50, 20, 15);
        addCloud(canvas.width - 120, 30, 12);
        addCloud(canvas.width * 0.3, 40, 18);
        addCloud(canvas.width * 0.6, 15, 14);
        addCloud(canvas.width * 0.8, 50, 10);

        // Add some flying birds (simple V shapes)
        const addBird = (x: number, y: number) => {
            ctx.fillStyle = '#2F2F2F';
            // Simple V shape
            ctx.fillRect(x, y, pixelSize, pixelSize);
            ctx.fillRect(x + pixelSize, y + pixelSize, pixelSize, pixelSize);
            ctx.fillRect(x + pixelSize * 2, y, pixelSize, pixelSize);
        };

        addBird(canvas.width * 0.7, 80);
        addBird(canvas.width * 0.72, 85);
        addBird(canvas.width * 0.25, 60);

    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ imageRendering: 'pixelated' }}
        />
    );
};

export default SkyBackground;
