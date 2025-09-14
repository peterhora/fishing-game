import React from 'react';
import Fish from './Fish';
import { PIXEL_FISH_DATA } from '../constants';
import type { FishData } from '../types';

interface GridViewProps {
  totalFish: number;
}

const GridView: React.FC<GridViewProps> = ({ totalFish }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-black/30 rounded-lg border border-cyan-300/50">
        <h3 className="text-center text-2xl font-bold text-white mb-4">Hint: Grid View</h3>
        {/* Grid */}
        <div className="grid grid-cols-10 gap-1 max-w-4xl mx-auto bg-blue-900/50 p-2 rounded">
                {Array.from({ length: 100 }).map((_, i) => {
                    const hasFish = i < totalFish;
                    const fishData: FishData | null = hasFish ? {
                        id: `grid-${i}`,
                        spriteIndex: i % PIXEL_FISH_DATA.length,
                        style: {}
                    } : null;

                    return (
                        <div
                            key={i}
                            className="w-full aspect-square border border-cyan-400/20 flex items-center justify-center rounded-sm relative"
                        >
                            {fishData && (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Fish fish={fishData} isCorrect={false} />
                                </div>
                            )}
                            {/* Add index number in lower right corner for every 10th square */}
                            {(i + 1) % 10 === 0 && (
                                <div className="absolute bottom-0 right-0 text-xs font-bold text-cyan-200 bg-black/50 px-1 rounded-tl">
                                    {i + 1}
                                </div>
                            )}
                        </div>
                    );
                })}
        </div>
    </div>
  );
};

export default GridView;
