import type React from 'react';

export interface MathProblem {
  a: number;
  b: number;
}

export type GameState = 'playing' | 'correct' | 'incorrect';

export interface FishData {
  id: string;
  spriteIndex: number;
  style: React.CSSProperties;
}

export interface PixelArt {
  pixels: number[][];
  palette: string[];
}
