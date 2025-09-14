import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { MathProblem, GameState, FishData } from './types';
import { PIXEL_FISH_DATA, MAX_NUM } from './constants';
import FishGroup from './components/FishGroup';
import GridView from './components/GridView';
import ControlPanel from './components/ControlPanel';
import MathProblemDisplay from './components/MathProblemDisplay';
import PixelFisherman from './components/PixelFisherman';
import SkyBackground from './components/SkyBackground';
import WaterSurfaceBackground from './components/WaterSurfaceBackground';
import UnderwaterBackground from './components/UnderwaterBackground';
import Numpad from './components/Numpad';
import Confetti from './components/Confetti';

const App: React.FC = () => {
  const [problem, setProblem] = useState<MathProblem>({ a: 0, b: 0 });
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [problemCount, setProblemCount] = useState<number>(0);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  const generateProblem = useCallback(() => {
    const a = Math.floor(Math.random() * MAX_NUM) + 1;
    const b = Math.floor(Math.random() * MAX_NUM) + 1;
    setProblem({ a, b });
    setUserAnswer('');
    setGameState('playing');
    setShowHint(false);
    setFeedbackMessage('');
    setProblemCount(prev => prev + 1);
  }, []);

  useEffect(() => {
    generateProblem();
    setScore(0);
    setProblemCount(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let hintTimer: ReturnType<typeof setTimeout>;
    if (showHint) {
      hintTimer = setTimeout(() => setShowHint(false), 10000);
    }
    return () => clearTimeout(hintTimer);
  }, [showHint]);

  const correctAnswer = useMemo(() => problem.a * problem.b, [problem]);

  const fishGroups = useMemo<FishData[][]>(() => {
    if (problem.a === 0 || problem.b === 0) return [];
    return Array.from({ length: problem.b }, (_, groupIndex) =>
      Array.from({ length: problem.a }, (_, fishIndex) => ({
        id: `${groupIndex}-${fishIndex}`,
        spriteIndex: Math.floor(Math.random() * PIXEL_FISH_DATA.length),
        style: {
            animationDelay: `${Math.random() * 2}s`,
            transform: `scaleX(${Math.random() > 0.5 ? 1 : -1})`,
        },
      }))
    );
  }, [problem]);

  const handleSubmit = () => {
    if (gameState !== 'playing' || !userAnswer) return;

    if (parseInt(userAnswer, 10) === correctAnswer) {
      setGameState('correct');
      setFeedbackMessage(`Great catch! ${problem.a} × ${problem.b} = ${correctAnswer}`);
      setScore(prev => prev + 1);
      setTimeout(() => {
        generateProblem();
      }, 2000);
    } else {
      setGameState('incorrect');
      setFeedbackMessage('Try again! Count the fish carefully.');
      setUserAnswer('');
      setTimeout(() => {
        setGameState('playing');
        setFeedbackMessage('');
      }, 1500);
    }
  };
  
  const handleReset = () => {
    setScore(0);
    setProblemCount(0);
    generateProblem();
  };
  
  const handleNumpadInput = (value: string) => {
    if (gameState === 'correct' || userAnswer.length >= 3) return;
    setUserAnswer(prev => prev + value);
  };
  
  const handleNumpadClear = () => {
    if (gameState === 'correct') return;
    setUserAnswer('');
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-b from-[#87CEEB] to-[#4682B4] font-mono select-none overflow-hidden">
        <Confetti isActive={gameState === 'correct'} />
        {/* Above Water */}
        <div className="relative h-[40vh] md:h-[35vh] flex-shrink-0 flex items-center justify-center">
            <SkyBackground />
            <WaterSurfaceBackground />
            
            <div className="relative w-full max-w-6xl flex justify-around items-center z-20 px-2 md:px-4">
                 {/* Fisherman on the left */}
                <div className="hidden lg:block">
                     <PixelFisherman />
                </div>

                {/* Math problem in the center */}
                 <MathProblemDisplay
                    problem={problem}
                    userAnswer={userAnswer}
                    onAnswerChange={(e) => setUserAnswer(e.target.value)}
                    onSubmit={handleSubmit}
                    gameState={gameState}
                    feedbackMessage={feedbackMessage}
                />

                {/* Numpad on the right */}
                <div>
                    <Numpad 
                        onInput={handleNumpadInput} 
                        onSubmit={handleSubmit} 
                        onClear={handleNumpadClear}
                    />
                </div>
            </div>
        </div>


        {/* Underwater */}
        <div className="relative flex-grow h-[60vh] md:h-[65vh] bg-gradient-to-b from-[#4682B4] via-[#1E5A8E] to-[#0D3654] overflow-auto p-4 md:p-8">
            <UnderwaterBackground />
            <div className="absolute inset-0 bg-black/20 z-0"></div>
            <div className="relative z-10 h-full">
                {showHint ? (
                    <GridView totalFish={correctAnswer} />
                ) : (
                    <div className="flex flex-wrap justify-center items-start gap-4">
                        {fishGroups.map((group, index) => (
                            <FishGroup key={index} index={index} fishes={group} isCorrect={gameState === 'correct'} />
                        ))}
                    </div>
                )}
            </div>
        </div>
        
        <ControlPanel
            score={score}
            problemNumber={problemCount}
            onHintClick={() => setShowHint(true)}
            onNewProblemClick={generateProblem}
            onResetClick={handleReset}
        />
    </div>
  );
};

export default App;
