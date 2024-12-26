// src/types/error/AppError.ts
import { ErrorCodes } from './ErrorCodes';
import { ErrorMetadata } from './ErrorMetadata';

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