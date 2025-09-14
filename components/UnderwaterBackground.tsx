import React, { useEffect, useRef } from 'react';

const UnderwaterBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size to full container
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const pixelSize = 2;
        const rows = Math.ceil(canvas.height / pixelSize);
        const cols = Math.ceil(canvas.width / pixelSize);

        // Underwater gradient colors (darker blues)
        const waterColors = ['#4682B4', '#1E5A8E', '#0D3654', '#0B2545'];
        const seaweedColors = ['#228B22', '#006400', '#2E8B57', '#008B8B'];
        const rockColors = ['#696969', '#2F2F2F', '#1C1C1C'];
        const coralColors = ['#FF7F50', '#FF6347', '#FFB6C1'];

        // Fill background with underwater gradient
        for (let row = 0; row < rows; row++) {
            const ratio = row / rows;
            const colorIndex = Math.floor(ratio * (waterColors.length - 1));
            ctx.fillStyle = waterColors[colorIndex] || waterColors[waterColors.length - 1];
            ctx.fillRect(0, row * pixelSize, canvas.width, pixelSize);
        }

        // Add seaweed
        const addSeaweed = (x: number, height: number, sway: number) => {
            for (let i = 0; i < height; i++) {
                const offsetX = Math.sin(i * 0.2) * sway;
                const seaweedX = x + offsetX * pixelSize;
                const seaweedY = canvas.height - (i * pixelSize);
                
                const color = seaweedColors[Math.floor(Math.random() * seaweedColors.length)];
                ctx.fillStyle = color;
                ctx.fillRect(seaweedX, seaweedY, pixelSize * 2, pixelSize);
            }
        };

        // Add multiple seaweed plants
        for (let i = 0; i < 8; i++) {
            const x = (canvas.width / 8) * i + Math.random() * 40;
            const height = 15 + Math.random() * 20;
            const sway = 2 + Math.random() * 3;
            addSeaweed(x, height, sway);
        }

        // Add rocks on the bottom
        const addRock = (x: number, y: number, width: number, height: number) => {
            for (let i = 0; i < width; i++) {
                for (let j = 0; j < height; j++) {
                    const rockX = x + (i * pixelSize);
                    const rockY = y + (j * pixelSize);
                    
                    if (Math.random() > 0.3) { // Make rocks somewhat irregular
                        const color = rockColors[Math.floor(Math.random() * rockColors.length)];
                        ctx.fillStyle = color;
                        ctx.fillRect(rockX, rockY, pixelSize, pixelSize);
                    }
                }
            }
        };

        // Add rocks scattered on the bottom
        for (let i = 0; i < 6; i++) {
            const x = Math.random() * (canvas.width - 100);
            const y = canvas.height - 30 - Math.random() * 20;
            const width = 8 + Math.random() * 12;
            const height = 4 + Math.random() * 8;
            addRock(x, y, width, height);
        }

        // Add coral formations
        const addCoral = (x: number, y: number, size: number) => {
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    const coralX = x + (i * pixelSize);
                    const coralY = y + (j * pixelSize);
                    
                    // Create branching coral pattern
                    if ((i + j) % 3 === 0 || i % 2 === 0) {
                        const color = coralColors[Math.floor(Math.random() * coralColors.length)];
                        ctx.fillStyle = color;
                        ctx.fillRect(coralX, coralY, pixelSize, pixelSize);
                    }
                }
            }
        };

        // Add coral formations
        addCoral(canvas.width * 0.15, canvas.height - 60, 12);
        addCoral(canvas.width * 0.75, canvas.height - 80, 15);
        addCoral(canvas.width * 0.45, canvas.height - 45, 8);

        // Add bubbles rising up
        const addBubbles = () => {
            for (let i = 0; i < 20; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const size = Math.random() > 0.5 ? 1 : 2;
                
                ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                ctx.fillRect(x, y, size * pixelSize, size * pixelSize);
            }
        };

        addBubbles();

        // Add some sand particles on the bottom
        for (let i = 0; i < cols; i++) {
            const x = i * pixelSize;
            const y = canvas.height - pixelSize;
            
            if (Math.random() > 0.7) {
                ctx.fillStyle = '#F4A460';
                ctx.fillRect(x, y, pixelSize, pixelSize);
            }
        }

    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-40"
            style={{ imageRendering: 'pixelated' }}
        />
    );
};

export default UnderwaterBackground;
