// src/services/error/EnhancedErrorHandler.ts
import { AppError, ErrorCodes, ErrorMetadata } from '../../types/error';

export class EnhancedErrorHandler {
  private static readonly MAX_RETRIES = 3;
  private static retryCount = 0;

  static async handleError(error: AppError): Promise<void> {
    console.error('Error caught:', {
      code: error.code,
      message: error.message,
      metadata: error.metadata,
    });

    if (error.isFatal) {
      await this.reportError(error);
    }

    // Add recovery logic based on error type
    switch (error.code) {
      case ErrorCodes.NETWORK:
        if (this.retryCount < this.MAX_RETRIES) {
          this.retryCount++;
          // Implement retry logic
        }
        break;
      case ErrorCodes.AUTH:
        // Handle auth errors (e.g., redirect to login)
        break;
      default:
        // Default error handling
        break;
    }
  }

  static async reportError(error: Error): Promise<void> {
    // Implement error reporting to your backend or service
    try {
      // Example: Send to error reporting service
      // await ErrorReportingService.report(error);
      console.log('Error reported:', error);
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  }

  static resetRetryCount(): void {
    this.retryCount = 0;
  }
} 