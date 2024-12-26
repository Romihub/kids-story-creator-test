// src/components/error/ErrorRecoveryScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ErrorRecoveryScreenProps {
  error: Error | undefined;
  onRetry: () => void;
  onReport: () => Promise<void>;
}

export const ErrorRecoveryScreen: React.FC<ErrorRecoveryScreenProps> = ({
  error,
  onRetry,
  onReport,
}) => {
  return (
    <View style={styles.container}>
      <Icon name="alert-circle-outline" size={64} color="#FF6B6B" />
      <Text style={styles.title}>Oops! Something went wrong</Text>
      <Text style={styles.message}>{error?.message ?? 'An unexpected error occurred'}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onRetry}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.reportButton]} onPress={onReport}>
          <Text style={styles.buttonText}>Report Issue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#333',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    marginHorizontal: 8,
  },
  reportButton: {
    backgroundColor: '#FF6B6B',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 