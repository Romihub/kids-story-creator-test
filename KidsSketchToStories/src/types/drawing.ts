//src/types/drawing.ts
export type DrawingTool = 'pencil' | 'crayon' | 'marker' | 'pen' | 'eraser' | 'highlight';

export interface DrawingState {
  tool: DrawingTool;
  color: string;
  strokeWidth: number;
  paths: DrawingPath[];
}

export interface PathConfig {
  x: number;
  y: number;
  tool: string;
  color: string;
  strokeWidth: number;
}

export interface DrawingPath {
  tool: DrawingTool;
  color: string;
  strokeWidth: number;
  points: Point[];
  data: string;
}

export interface Point {
  x: number;
  y: number;
}