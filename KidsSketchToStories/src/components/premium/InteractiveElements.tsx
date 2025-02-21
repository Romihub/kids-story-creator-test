// src/components/premium/InteractiveElements.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { 
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  runOnJS
} from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface InteractiveElement {
  id: string;
  style: object;
}

interface InteractiveElementsProps {
  storyId: string;
}

export const InteractiveElements: React.FC<InteractiveElementsProps> = ({ storyId }) => {
  const [elements, setElements] = useState<InteractiveElement[]>([]);
  
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  });

  const handleElementInteraction = (elementId: string) => {
    'worklet';
    scale.value = withSpring(1.2, {}, (finished) => {
      if (finished) {
        scale.value = withSpring(1);
      }
    });
  };

  return (
    <View style={styles.container}>
      {elements.map(element => (
        <Animated.View key={element.id} style={animatedStyle}>
          <TouchableWithoutFeedback
            onPress={() => handleElementInteraction(element.id)}
          >
            <View style={[styles.element, element.style]}>
              {/* Interactive element content */}
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  element: {
    padding: 8,
  }
});
