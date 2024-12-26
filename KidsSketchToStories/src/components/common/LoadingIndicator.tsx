// src/components/common/LoadingIndicator.tsx
import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface LoadingIndicatorProps {
  progress: Animated.Value;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ progress }) => {
  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.progressBar,
          { width }
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 4,
    width: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
  },
}); 