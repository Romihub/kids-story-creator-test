// src/components/premium/RealTimeIndicator.tsx
import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface RealTimeIndicatorProps {
  isConnected: boolean;
}

export const RealTimeIndicator: React.FC<RealTimeIndicatorProps> = ({ isConnected }) => {
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (isConnected) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.4,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isConnected]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, { opacity: pulseAnim }]}>
        <Icon 
          name={isConnected ? 'access-point' : 'access-point-off'} 
          size={16} 
          color={isConnected ? '#4CAF50' : '#F44336'} 
        />
      </Animated.View>
      <Text style={styles.text}>
        {isConnected ? 'Connected' : 'Disconnected'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  dot: {
    marginRight: 8,
  },
  text: {
    fontSize: 12,
    color: '#666',
  },
}); 