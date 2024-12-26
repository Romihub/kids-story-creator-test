// src/components/error/EnhancedErrorBoundary.tsx
import React from 'react';
import { ErrorRecoveryScreen } from './ErrorRecoveryScreen';
import { EnhancedErrorHandler } from '../../services/error/EnhancedErrorHandler';
import { AppError, ErrorCodes } from '../../types/error';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | undefined;
}

export class EnhancedErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
    error: undefined
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  async componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const componentStack = errorInfo.componentStack || undefined;
    await EnhancedErrorHandler.handleError(new AppError(
      ErrorCodes.REACT,
      error.message,
      true,
      { componentStack }
    ));
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  handleReport = async () => {
    // Implement error reporting logic
    if (this.state.error) {
      await EnhancedErrorHandler.reportError(this.state.error);
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorRecoveryScreen
          error={this.state.error}
          onRetry={this.handleRetry}
          onReport={this.handleReport}
        />
      );
    }

    return this.props.children;
  }
}