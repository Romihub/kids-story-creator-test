import React, { useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getColor } from '../../themes/themeHelpers';

interface AnimatedStarProps {
  position: {
    top: number;
    left: number;
  };
  size: number;
  delay: number;
  parentAnimation?: Animated.Value;
}

export const AnimatedStar: React.FC<AnimatedStarProps> = ({
  position,
  size,
  delay,
  parentAnimation
}) => {
  const floatAnimation = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startFloatingAnimation();
  }, []);

  const startFloatingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnimation, {
          toValue: 1,
          duration: 2000 + Math.random() * 1000,
          useNativeDriver: true,
          delay,
        }),
        Animated.timing(floatAnimation, {
          toValue: 0,
          duration: 2000 + Math.random() * 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const animatedStyle = {
    transform: [
      {
        translateY: floatAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10],
        }),
      },
    ],
    opacity: parentAnimation ? parentAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.7],
    }) : floatAnimation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.3, 0.7, 0.3],
    }),
  };

  return (
    <Animated.View
      style={[
        styles.star,
        {
          top: position.top,
          left: position.left,
          width: size,
          height: size,
        },
        animatedStyle,
      ]}
    >
      <MaterialCommunityIcons
        name="star"
        size={size}
        color={getColor.text.inverse()}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  star: {
    position: 'absolute',
    zIndex: 1,
  },
});

export default AnimatedStar;
