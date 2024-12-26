// src/components/error/ErrorRecoveryUI.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../common/Button';
import { ErrorIcon } from './ErrorIcon';
import { ErrorRecoveryManager } from '../../services/error/ErrorRecoveryManager';
import { AppError } from '../../types/error';

export const ErrorRecoveryUI: React.FC<{
    error: AppError;
    onRetry: () => void;
}> = ({ error, onRetry }) => {
    const [recovering, setRecovering] = useState(false);
    const [recoverySteps, setRecoverySteps] = useState<string[]>([]);
  
    const handleRecovery = async () => {
      setRecovering(true);
      try {
        const recovered = await ErrorRecoveryManager.handleError(error);
        if (recovered) {
          onRetry();
        }
      } finally {
        setRecovering(false);
      }
    };
  
    return (
      <View style={styles.container}>
        <ErrorIcon type={error.code} />
        <Text style={styles.errorMessage}>{error.message}</Text>
        {recoverySteps.map((step: string, index: number) => (
          <Text key={index} style={styles.recoveryStep}>{step}</Text>
        ))}
        <Button
          title={recovering ? "Recovering..." : "Try to Fix"}
          onPress={handleRecovery}
          disabled={recovering}
        />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorMessage: {
    fontSize: 16,
    color: '#FF6B6B',
    marginVertical: 10,
    textAlign: 'center',
  },
  recoveryStep: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
});