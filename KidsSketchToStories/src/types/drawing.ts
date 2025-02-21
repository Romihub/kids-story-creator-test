//src/types/drawing.ts
export type DrawingTool = 'pencil' | 'crayon' | 'marker' | 'pen' | 'eraser' | 'highlight';

export interface SavedDrawing {
  id: string;
  paths: DrawingPath[];
  color: string;
  strokeWidth: number;
  tool: string;
  timestamp: string;
  thumbnailUrl?: string;
}

export interface DrawingState {
  tool: DrawingTool;
  color: string;
  strokeWidth: number;
  paths: DrawingPath[];
}

export interface Point {
  x: number;
  y: number;
  pressure?: number;
}

export interface PathConfig {
  x: number;
  y: number;
  tool: DrawingTool;
  color: string;
  strokeWidth: number;
  pressure?: number;
}

export interface DrawingPath {
  tool: DrawingTool;
  color: string;
  strokeWidth: number;
  points: Point[];
  data: string;
  pressure?: number;
  timestamp?: number;
}

export interface DrawingStyle {
  stroke: string;
  strokeWidth: number;
  strokeOpacity?: number;
  strokeLinecap?: 'round' | 'square' | 'butt';
  strokeLinejoin?: 'round' | 'bevel' | 'miter';
  strokeDasharray?: number[];
  fill?: string;
}

export interface DrawingHook {
  // Drawing tools state
  currentTool: DrawingTool;
  currentColor: string;
  strokeWidth: number;
  isPanelExpanded: boolean;

  // Drawing state
  paths: DrawingPath[];
  startPath: (config: PathConfig) => void;
  addPoint: (point: Point) => void;
  endPath: () => void;
  
  // Actions
  setTool: (tool: DrawingTool) => void;
  setColor: (color: string) => void;
  setSize: (size: number) => void;
  togglePanel: () => void;
  clear: () => void;
  saveDrawing: (drawing: { paths: DrawingPath[] }) => Promise<SavedDrawing>;
  undo: () => void;
  redo: () => void;

  // Undo/redo state
  hasUndo: boolean;
  hasRedo: boolean;
}
