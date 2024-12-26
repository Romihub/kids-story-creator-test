// src/types/ai.ts
export interface EnhanceOptions {
  creativity: number;
  tone: string;
  complexity: string;
}

export interface AIResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

export interface Character {
  name: string;
  description: string;
  traits: string[];
} 