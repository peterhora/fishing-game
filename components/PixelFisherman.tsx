import React from 'react';

const PixelFisherman: React.FC = () => {
    return (
        <div className="relative">
            <div className="relative z-10">
                <img 
                    src="/images/fisherman.png" 
                    alt="Pixel Fisherman in boat"
                    className="drop-shadow-lg max-h-32 w-auto"
                    style={{ 
                        imageRendering: 'pixelated',
                        imageRendering: '-webkit-optimize-contrast',
                        imageRendering: '-o-crisp-edges',
                        imageRendering: 'crisp-edges'
                    }}
                />
            </div>
        </div>
    );
};

export default PixelFisherman;
