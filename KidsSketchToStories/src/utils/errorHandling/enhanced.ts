// src/utils/errorHandling/enhanced.ts
export class EnhancedErrorHandler {
    static async handleError(error: AppError) {
      // Log error
      await AnalyticsService.logEvent('error_occurred', {
        code: error.code,
        message: error.message,
        stackTrace: error.stack
      });
  
      // Attempt recovery
      if (error.recoverable) {
        return await this.attemptRecovery(error);
      }
  
      // Show appropriate UI
      this.showErrorUI(error);
    }
  
    static async attemptRecovery(error: AppError) {
      switch (error.code) {
        case ErrorCodes.NETWORK:
          return await this.handleNetworkError(error);
        case ErrorCodes.STORAGE:
          return await this.handleStorageError(error);
        case ErrorCodes.AUTH:
          return await this.handleAuthError(error);
        default:
          return false;
      }
    }
  
    static showErrorUI(error: AppError) {
      // Show appropriate error UI based on error type
      ErrorUIManager.show({
        type: error.code,
        message: error.message,
        action: this.getRecoveryAction(error)
      });
    }
}