// src/types/collaboration.ts
export interface Point {
  x: number;
  y: number;
  pressure?: number;
}

export interface StrokeData {
  points: Point[];
  color: string;
  width: number;
  collaboratorId: string;
  timestamp: number;
}

export interface DrawingSession {
  id: string;
  collaborators: Collaborator[];
  strokes: StrokeData[];
  status: 'active' | 'completed';
  createdAt: number;
  lastModified: number;
}

export interface Collaborator {
  id: string;
  name: string;
  avatar?: string;
  isActive: boolean;
}

export interface DrawingUpdate {
  type: 'stroke' | 'erase' | 'clear';
  data: StrokeData | null;
  timestamp: number;
  userId: string;
} 