import React from 'react';
import type { FishData } from '../types';
import Fish from './Fish';

interface FishGroupProps {
  fishes: FishData[];
  isCorrect: boolean;
  index: number;
}

const FishGroup: React.FC<FishGroupProps> = ({ fishes, isCorrect, index }) => {
  const swimAwayClass = isCorrect 
    ? (index % 2 === 0 ? 'animate-swim-away-left' : 'animate-swim-away-right')
    : '';

  return (
    <div className={`bg-white/10 backdrop-blur-sm border-2 border-dashed border-white/20 rounded-xl p-2 min-w-[150px] min-h-[100px] transition-transform duration-500 ${swimAwayClass}`}>
      <div className="flex flex-wrap justify-center items-center">
        {fishes.map((fish) => (
          <Fish key={fish.id} fish={fish} isCorrect={isCorrect} />
        ))}
      </div>
    </div>
  );
};

// Add keyframes for swim away animation
const style = document.createElement('style');
style.textContent = `
    @keyframes swim-away-left {
        0% { transform: translateX(0); opacity: 1; }
        100% { transform: translateX(-100vw); opacity: 0; }
    }
    @keyframes swim-away-right {
        0% { transform: translateX(0); opacity: 1; }
        100% { transform: translateX(100vw); opacity: 0; }
    }
    .animate-swim-away-left {
        animation: swim-away-left 1.5s 0.2s ease-in forwards;
    }
    .animate-swim-away-right {
        animation: swim-away-right 1.5s 0.2s ease-in forwards;
    }
`;
document.head.append(style);


export default FishGroup;