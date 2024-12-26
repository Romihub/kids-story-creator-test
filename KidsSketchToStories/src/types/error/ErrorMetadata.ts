// src/types/error/ErrorMetadata.ts
export interface ErrorMetadata {
  [key: string]: any;
  componentStack?: string | null;
  timestamp?: number;
} 