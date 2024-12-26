// src/components/premium/AIStoryEnhancer.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { LoadingIndicator } from '../common/LoadingIndicator';
import { useAI } from '../../hooks/useAI';

export const AIStoryEnhancer: React.FC<{
  storyId: string;
  content: string;
  onUpdate: (content: string) => void;
}> = ({ storyId, content, onUpdate }) => {
  const { 
    enhanceStory,
    loading,
    progress,
    error 
  } = useAI();

  const progressAnim = React.useRef(new Animated.Value(0)).current;
  
  React.useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [progress]);

  const handleEnhance = async () => {
    try {
      const enhanced = await enhanceStory(content, {
        creativity: 0.8,
        tone: 'playful',
        complexity: 'age-appropriate'
      });
      onUpdate(enhanced);
    } catch (error) {
      // Error will be handled by error state
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <LoadingIndicator progress={progressAnim} />
          <Text style={styles.loadingText}>
            Enhancing your story...
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.enhanceButton}
        onPress={handleEnhance}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Enhancing...' : 'Enhance with AI'}
        </Text>
      </TouchableOpacity>
      {error && (
        <Text style={styles.errorText}>
          {error.message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  enhanceButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
  },
});