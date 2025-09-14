import React from 'react';

interface ConfettiProps {
    isActive: boolean;
}

const CONFETTI_COUNT = 100;
const COLORS = ['#FFD700', '#FF69B4', '#00BFFF', '#32CD32', '#FF4500'];

const Confetti: React.FC<ConfettiProps> = ({ isActive }) => {
    if (!isActive) {
        return null;
    }

    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none z-[100] overflow-hidden">
            {Array.from({ length: CONFETTI_COUNT }).map((_, i) => {
                const color = COLORS[i % COLORS.length];
                // Fix: Use a type assertion on the style object to allow custom CSS properties.
                // React.CSSProperties does not include index signatures for custom properties like '--x-end',
                // which causes a TypeScript error with explicit typing.
                const style = {
                    backgroundColor: color,
                    left: '50%',
                    top: '50%',
                    width: '8px',
                    height: `${Math.random() * 10 + 6}px`,
                    '--x-end': `${(Math.random() - 0.5) * 800}px`,
                    '--y-end': `${(Math.random()) * 400 + 300}px`,
                    '--rotate-end': `${Math.random() * 360}deg`,
                    animation: `confetti-fall ${1.5 + Math.random() * 1.5}s ease-out forwards`,
                    animationDelay: `${Math.random() * 0.2}s`,
                } as React.CSSProperties;
                return <div key={i} className="absolute" style={style} />;
            })}
        </div>
    );
};

const style = document.createElement('style');
style.textContent = `
    @keyframes confetti-fall {
        0% {
            transform: translate(-50%, -50%) rotate(0);
            opacity: 1;
        }
        100% {
            transform: translate(var(--x-end), var(--y-end)) rotate(var(--rotate-end));
            opacity: 0;
        }
    }
`;
document.head.append(style);

export default Confetti;
