
import React from 'react';
import type { MathProblem, GameState } from '../types';

interface MathProblemDisplayProps {
  problem: MathProblem;
  userAnswer: string;
  onAnswerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  gameState: GameState;
  feedbackMessage: string;
}

const MathProblemDisplay: React.FC<MathProblemDisplayProps> = ({
  problem,
  userAnswer,
  onAnswerChange,
  onSubmit,
  gameState,
  feedbackMessage,
}) => {

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  };

  const getBorderColor = () => {
    switch (gameState) {
      case 'correct':
        return 'border-green-400';
      case 'incorrect':
        return 'border-red-500';
      default:
        return 'border-white/50';
    }
  };
  
  const shakeClass = gameState === 'incorrect' ? 'animate-shake' : '';

  return (
    <div className={`p-4 bg-black/40 backdrop-blur-md rounded-lg shadow-2xl text-white text-center transition-all duration-300 ${getBorderColor()} border-4`}>
        <div className={`flex items-center justify-center text-4xl md:text-5xl font-bold ${shakeClass}`}>
            <span className="text-yellow-300">{problem.a}</span>
            <span className="mx-4 text-cyan-300">×</span>
            <span className="text-yellow-300">{problem.b}</span>
            <span className="mx-4 text-cyan-300">=</span>
            <input
                type="number"
                value={userAnswer}
                onChange={onAnswerChange}
                onKeyDown={handleKeyDown}
                className={`w-28 md:w-36 h-16 text-center text-5xl font-bold bg-white/20 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 transition-all duration-300 ${getBorderColor()} border-2`}
                min="1"
                max="100"
                disabled={gameState === 'correct'}
            />
        </div>
        <p className={`mt-2 text-lg h-6 transition-opacity duration-300 ${feedbackMessage ? 'opacity-100' : 'opacity-0'}`}>
            {gameState === 'correct' && <span className="text-green-300">✅ {feedbackMessage}</span>}
            {gameState === 'incorrect' && <span className="text-red-400">❌ {feedbackMessage}</span>}
        </p>
    </div>
  );
};

const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    .animate-shake {
        animation: shake 0.5s ease-in-out;
    }
`;
document.head.append(style);

export default MathProblemDisplay;
