import React, { useEffect, useRef } from 'react';

const WaterSurfaceBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size to full container
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const pixelSize = 3;
        const rows = Math.ceil(canvas.height / pixelSize);
        const cols = Math.ceil(canvas.width / pixelSize);

        // Water surface colors (blues and whites for waves)
        const waterColors = ['#4682B4', '#5BA3D0', '#6BB6FF', '#87CEEB'];
        const waveColors = ['#FFFFFF', '#E6F3FF', '#CCE7FF'];

        // Fill background with water gradient
        for (let row = 0; row < rows; row++) {
            const ratio = row / rows;
            const colorIndex = Math.floor(ratio * (waterColors.length - 1));
            ctx.fillStyle = waterColors[colorIndex] || waterColors[waterColors.length - 1];
            ctx.fillRect(0, row * pixelSize, canvas.width, pixelSize);
        }

        // Add animated wave patterns
        const time = Date.now() * 0.001; // For animation
        
        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                const x = col * pixelSize;
                const y = row * pixelSize;
                
                // Create wave pattern
                const waveHeight = Math.sin((col * 0.1) + time) * 3;
                const waveRow = Math.floor(rows * 0.3) + waveHeight;
                
                if (Math.abs(row - waveRow) < 2 && Math.random() > 0.6) {
                    const waveColor = waveColors[Math.floor(Math.random() * waveColors.length)];
                    ctx.fillStyle = waveColor;
                    ctx.fillRect(x, y, pixelSize, pixelSize);
                }
                
                // Add some smaller ripples
                if (Math.random() > 0.95) {
                    ctx.fillStyle = waveColors[0];
                    ctx.fillRect(x, y, pixelSize, pixelSize);
                }
            }
        }

        // Add some floating elements (lily pads, debris)
        const addFloatingElement = (x: number, y: number, color: string, size: number) => {
            ctx.fillStyle = color;
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    const elementX = x + (i * pixelSize);
                    const elementY = y + (j * pixelSize);
                    
                    const centerX = size / 2;
                    const centerY = size / 2;
                    const distance = Math.sqrt(Math.pow(i - centerX, 2) + Math.pow(j - centerY, 2));
                    
                    if (distance < size * 0.4) {
                        ctx.fillRect(elementX, elementY, pixelSize, pixelSize);
                    }
                }
            }
        };

        // Add some lily pads
        addFloatingElement(canvas.width * 0.2, canvas.height * 0.6, '#228B22', 4);
        addFloatingElement(canvas.width * 0.8, canvas.height * 0.4, '#32CD32', 3);
        addFloatingElement(canvas.width * 0.6, canvas.height * 0.7, '#228B22', 3);

    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-30"
            style={{ imageRendering: 'pixelated' }}
        />
    );
};

export default WaterSurfaceBackground;
