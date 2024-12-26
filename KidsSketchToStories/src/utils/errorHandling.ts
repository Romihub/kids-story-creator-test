// src/utils/errorHandling.ts
export class AppError extends Error {
    constructor(
      public code: string,
      message: string,
      public recoverable: boolean = true,
      public metadata?: any
    ) {
      super(message);
      this.name = 'AppError';
    }
}
  
export const ErrorCodes = {
    NETWORK: 'ERR_NETWORK',
    SUBSCRIPTION: 'ERR_SUBSCRIPTION',
    STORAGE: 'ERR_STORAGE',
    DRAWING: 'ERR_DRAWING',
    STORY: 'ERR_STORY',
} as const;