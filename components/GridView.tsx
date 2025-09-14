import React from 'react';
import Fish from './Fish';
import { PIXEL_FISH_DATA } from '../constants';
import type { FishData } from '../types';

interface GridViewProps {
  totalFish: number;
}

const GridView: React.FC<GridViewProps> = ({ totalFish }) => {
  // Create a reordered grid where each row has 10 squares, starting with 0
  // Row 1: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  // Row 2: 10, 11, 12, 13, 14, 15, 16, 17, 18, 19  
  // Row 3: 20, 21, 22, 23, 24, 25, 26, 27, 28, 29
  // Row 4: 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, etc.
  const createReorderedGrid = () => {
    const grid = [];
    
    // Define the exact layout pattern with 10 columns
    const layoutPattern = [
      // Row 1: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      // Row 2: 10, 11, 12, 13, 14, 15, 16, 17, 18, 19
      [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
      // Row 3: 20, 21, 22, 23, 24, 25, 26, 27, 28, 29
      [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
      // Row 4: 30, 31, 32, 33, 34, 35, 36, 37, 38, 39
      [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
      // Row 5: 40, 41, 42, 43, 44, 45, 46, 47, 48, 49
      [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
      // Row 6: 50, 51, 52, 53, 54, 55, 56, 57, 58, 59
      [50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
      // Row 7: 60, 61, 62, 63, 64, 65, 66, 67, 68, 69
      [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
      // Row 8: 70, 71, 72, 73, 74, 75, 76, 77, 78, 79
      [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
      // Row 9: 80, 81, 82, 83, 84, 85, 86, 87, 88, 89
      [80, 81, 82, 83, 84, 85, 86, 87, 88, 89],
      // Row 10: 90, 91, 92, 93, 94, 95, 96, 97, 98, 99
      [90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
    ];
    
    // Convert layout pattern to grid items
    layoutPattern.forEach((row, rowIndex) => {
      row.forEach((displayNumber, colIndex) => {
        const isMilestone = displayNumber % 10 === 0 && displayNumber > 0; // Milestone for 10, 20, 30... but not 0
        const isZero = displayNumber === 0;
        const isFirstInRow = colIndex === 0; // First column in each row
        grid.push({
          originalIndex: displayNumber, // Use actual number as index (0-indexed naturally)
          displayIndex: displayNumber, // Display as is (0, 1, 2, 3...)
          isMilestone: isMilestone,
          isZero: isZero,
          isFirstInRow: isFirstInRow
        });
      });
    });
    
    return grid;
  };

  const reorderedGrid = createReorderedGrid();

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-black/30 rounded-lg border border-cyan-300/50">
        <h3 className="text-center text-2xl font-bold text-white mb-4">Hint: Grid View</h3>
        {/* Grid with 10 columns */}
        <div className="grid grid-cols-10 gap-1 max-w-4xl mx-auto bg-blue-900/50 p-2 rounded">
                {reorderedGrid.map((item, gridIndex) => {
                    // Fish appear starting from index 1, not 0
                    const hasFish = item.originalIndex > 0 && item.originalIndex <= totalFish;
                    const fishData: FishData | null = hasFish ? {
                        id: `grid-${item.originalIndex}`,
                        spriteIndex: (item.originalIndex - 1) % PIXEL_FISH_DATA.length, // Adjust for 0-indexing
                        style: {}
                    } : null;

                    return (
                        <div
                            key={`${item.originalIndex}-${gridIndex}`}
                            className={`w-full aspect-square border flex items-center justify-center rounded-sm relative ${
                                item.isZero
                                    ? 'border-gray-400/60 bg-gray-400/10'
                                    : item.isMilestone 
                                        ? 'border-yellow-400/60 bg-yellow-400/10' 
                                        : 'border-cyan-400/20'
                            }`}
                        >
                            {fishData && (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Fish fish={fishData} isCorrect={false} />
                                </div>
                            )}
                            {/* Show index number only for first square in each row, but not for zero */}
                            {item.isFirstInRow && !item.isZero && (
                                <div className={`absolute top-0 left-0 text-xs font-bold px-1 rounded-br ${
                                    item.isMilestone 
                                        ? 'text-yellow-200 bg-yellow-600/80' 
                                        : 'text-cyan-200 bg-blue-600/70'
                                }`}>
                                    {item.displayIndex}
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
