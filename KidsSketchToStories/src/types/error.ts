// src/types/error.ts   
export enum ErrorCodes {
  REACT = 'REACT_ERROR',
  NETWORK = 'NETWORK_ERROR',
  AUTH = 'AUTH_ERROR',
  STORAGE = 'STORAGE_ERROR',
  AI = 'AI_ERROR',
  UNKNOWN = 'UNKNOWN_ERROR'
}

export interface ErrorMetadata {
  [key: string]: any;
  componentStack?: string;
  timestamp?: number;
}

export class AppError extends Error {
  constructor(
    public code: ErrorCodes,
    message: string,
    public isFatal: boolean = false,
    public metadata: ErrorMetadata = {}
  ) {
    super(message);
    this.name = 'AppError';
    this.metadata.timestamp = Date.now();
  }
} 