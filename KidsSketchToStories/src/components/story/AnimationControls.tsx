// src/components/story/AnimationControls.tsx - Part 1
import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Animated, 
  Dimensions 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import { Easing, EasingFunction } from 'react-native';

interface AnimationControlsProps {
  storyId: string;
  onSpeedChange?: (speed: number) => void;
  onToggleAnimation?: (enabled: boolean) => void;
  onEasingChange?: (easing: EasingFunction) => void;
}

type EasingType = 'linear' | 'ease' | 'bounce' | 'elastic' | 'back' | 
  'cubic' | 'quad' | 'bezier' | 'circle' | 'sin' | 'exp' | 'out' | 
  'in' | 'inOut';

type AnimationPreset = {
  name: string;
  speed: number;
  easing: EasingType;
  easingFunction: EasingFunction;
  description?: string;
};

// Extended presets with more options and descriptions
const ANIMATION_PRESETS: AnimationPreset[] = [
  { 
    name: 'Very Slow',
    speed: 0.25,
    easing: 'linear',
    easingFunction: Easing.linear,
    description: 'Constant speed throughout'
  },
  { 
    name: 'Slow',
    speed: 0.5,
    easing: 'ease',
    easingFunction: Easing.ease,
    description: 'Gradual acceleration and deceleration'
  },
  { 
    name: 'Normal',
    speed: 1,
    easing: 'linear',
    easingFunction: Easing.linear,
    description: 'Standard speed'
  },
  { 
    name: 'Fast',
    speed: 1.5,
    easing: 'ease',
    easingFunction: Easing.ease,
    description: 'Quick and smooth'
  },
  { 
    name: 'Very Fast',
    speed: 2,
    easing: 'linear',
    easingFunction: Easing.linear,
    description: 'Maximum speed'
  },
  { 
    name: 'Bounce',
    speed: 1,
    easing: 'bounce',
    easingFunction: Easing.bounce,
    description: 'Bouncy effect at the end'
  },
  { 
    name: 'Elastic',
    speed: 1,
    easing: 'elastic',
    easingFunction: Easing.elastic(1),
    description: 'Springy motion'
  },
  { 
    name: 'Smooth',
    speed: 1,
    easing: 'cubic',
    easingFunction: Easing.cubic,
    description: 'Smooth acceleration'
  },
  { 
    name: 'Anticipate',
    speed: 1,
    easing: 'back',
    easingFunction: Easing.back(1.5),
    description: 'Slight pullback before motion'
  },
  { 
    name: 'Circle',
    speed: 1,
    easing: 'circle',
    easingFunction: Easing.circle,
    description: 'Circular motion curve'
  },
  { 
    name: 'Exponential',
    speed: 1,
    easing: 'exp',
    easingFunction: Easing.exp,
    description: 'Exponential acceleration'
  },
  { 
    name: 'Sine Wave',
    speed: 1,
    easing: 'sin',
    easingFunction: Easing.sin,
    description: 'Sinusoidal motion'
  }
];

// Create map of easing functions with customizable parameters
const createEasingFunctions = (config: { bounciness?: number; elasticity?: number } = {}) => ({
  linear: Easing.linear,
  ease: Easing.ease,
  bounce: Easing.bounce,
  elastic: Easing.elastic(config.elasticity || 1),
  back: Easing.back(1.5),
  cubic: Easing.cubic,
  quad: Easing.quad,
  bezier: Easing.bezier(0.25, 0.1, 0.25, 1),
  circle: Easing.circle,
  sin: Easing.sin,
  exp: Easing.exp,
  out: Easing.out(Easing.ease),
  in: Easing.in(Easing.ease),
  inOut: Easing.inOut(Easing.ease),
});

// Animation preview component
const AnimationPreview: React.FC<{
  easingFunction: EasingFunction;
  speed: number;
  isPlaying: boolean;
}> = ({ easingFunction, speed, isPlaying }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const windowWidth = Dimensions.get('window').width;

  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000 / speed,
            easing: easingFunction,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 1000 / speed,
            easing: easingFunction,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      animatedValue.setValue(0);
    }

    return () => {
      animatedValue.setValue(0);
    };
  }, [easingFunction, speed, isPlaying]);

  return (
    <View style={styles.previewContainer}>
      <Animated.View
        style={[
          styles.previewDot,
          {
            transform: [
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, windowWidth - 80],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};


// src/components/story/AnimationControls.tsx - Part 2
export const AnimationControls: React.FC<AnimationControlsProps> = ({ 
    storyId,
    onSpeedChange,
    onToggleAnimation,
    onEasingChange 
  }) => {
    const [speed, setSpeed] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedEasing, setSelectedEasing] = useState<EasingType>('linear');
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [customConfig, setCustomConfig] = useState({ bounciness: 1, elasticity: 1 });
    
    const easingFunctions = createEasingFunctions(customConfig);
  
    const handleSpeedChange = (value: number) => {
      setSpeed(value);
      onSpeedChange?.(value);
    };
  
    const togglePlayState = () => {
      setIsPlaying(!isPlaying);
      onToggleAnimation?.(!isPlaying);
    };
  
    const handleEasingChange = (easingType: EasingType) => {
      setSelectedEasing(easingType);
      const easingFunction = easingFunctions[easingType];
      onEasingChange?.(easingFunction);
    };
  
    const applyPreset = (preset: AnimationPreset) => {
      handleSpeedChange(preset.speed);
      setSelectedEasing(preset.easing);
      onEasingChange?.(preset.easingFunction);
    };
  
    const updateCustomConfig = (key: keyof typeof customConfig, value: number) => {
      setCustomConfig(prev => ({
        ...prev,
        [key]: value,
      }));
    };
  
    return (
      <View style={styles.container}>
        {/* Preview Section */}
        <AnimationPreview
          easingFunction={easingFunctions[selectedEasing]}
          speed={speed}
          isPlaying={isPlaying}
        />
  
        {/* Main Controls */}
        <View style={styles.header}>
          <Text style={styles.title}>Animation Controls</Text>
          <TouchableOpacity 
            style={styles.playButton}
            onPress={togglePlayState}
          >
            <Icon 
              name={isPlaying ? 'pause-circle' : 'play-circle'} 
              size={32} 
              color="#007AFF" 
            />
          </TouchableOpacity>
        </View>
  
        {/* Speed Control */}
        <View style={styles.speedControl}>
          <Icon name="snail" size={20} color="#666" />
          <View style={styles.sliderContainer}>
            <Text style={styles.label}>Animation Speed ({speed.toFixed(2)}x)</Text>
            <Slider
              style={styles.slider}
              minimumValue={0.25}
              maximumValue={2}
              step={0.25}
              value={speed}
              onValueChange={handleSpeedChange}
              minimumTrackTintColor="#007AFF"
              maximumTrackTintColor="#D1D1D6"
              thumbTintColor="#007AFF"
            />
          </View>
          <Icon name="rabbit" size={20} color="#666" />
        </View>
  
        {/* Animation Presets */}
        <Text style={styles.sectionTitle}>Presets</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.presetsScroll}
        >
          <View style={styles.presetButtons}>
            {ANIMATION_PRESETS.map((preset) => (
              <TouchableOpacity 
                key={preset.name}
                style={[
                  styles.presetButton,
                  speed === preset.speed && selectedEasing === preset.easing && styles.presetButtonActive
                ]}
                onPress={() => applyPreset(preset)}
              >
                <Text style={[
                  styles.presetText,
                  speed === preset.speed && selectedEasing === preset.easing && styles.presetTextActive
                ]}>
                  {preset.name}
                </Text>
                {preset.description && (
                  <Text style={[
                    styles.presetDescription,
                    speed === preset.speed && selectedEasing === preset.easing && styles.presetDescriptionActive
                  ]}>
                    {preset.description}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
  
        {/* Advanced Controls Toggle */}
        <TouchableOpacity 
          style={styles.advancedToggle}
          onPress={() => setShowAdvanced(!showAdvanced)}
        >
          <Text style={styles.advancedToggleText}>
            {showAdvanced ? 'Hide Advanced' : 'Show Advanced'} Controls
          </Text>
          <Icon 
            name={showAdvanced ? 'chevron-up' : 'chevron-down'} 
            size={20} 
            color="#666"
          />
        </TouchableOpacity>
  
        {/* Advanced Controls Section */}
        {showAdvanced && (
          <View style={styles.advancedControls}>
            <Text style={styles.advancedTitle}>Easing Type</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.easingScroll}
            >
              <View style={styles.easingButtons}>
                {Object.keys(easingFunctions).map((easingType) => (
                  <TouchableOpacity 
                    key={easingType}
                    style={[
                      styles.easingButton,
                      selectedEasing === easingType && styles.easingButtonActive
                    ]}
                    onPress={() => handleEasingChange(easingType as EasingType)}
                  >
                    <Text style={styles.easingText}>{easingType}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
  
            {/* Custom Easing Parameters */}
            {(selectedEasing === 'elastic' || selectedEasing === 'bounce') && (
              <View style={styles.customParams}>
                <Text style={styles.paramLabel}>
                  {selectedEasing === 'elastic' ? 'Elasticity' : 'Bounciness'}
                </Text>
                <Slider
                  style={styles.paramSlider}
                  minimumValue={0.1}
                  maximumValue={3}
                  step={0.1}
                  value={selectedEasing === 'elastic' ? customConfig.elasticity : customConfig.bounciness}
                  onValueChange={(value) => 
                    updateCustomConfig(
                      selectedEasing === 'elastic' ? 'elasticity' : 'bounciness',
                      value
                    )
                  }
                />
                <Text style={styles.paramValue}>
                  {(selectedEasing === 'elastic' ? customConfig.elasticity : customConfig.bounciness).toFixed(1)}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F8F8F8',
      padding: 16,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    previewContainer: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 8,
      marginBottom: 16,
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#E5E5EA',
    },
    previewDot: {
      width: 20,
      height: 20,
      backgroundColor: '#007AFF',
      borderRadius: 10,
      margin: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 8,
    },
    playButton: {
      padding: 4,
    },
    speedControl: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    sliderContainer: {
      flex: 1,
      marginHorizontal: 12,
    },
    label: {
      fontSize: 14,
      color: '#666',
      marginBottom: 4,
    },
    slider: {
      height: 40,
    },
    presetsScroll: {
      marginBottom: 16,
    },
    presetButtons: {
      flexDirection: 'row',
      gap: 8,
      paddingHorizontal: 4,
    },
    presetButton: {
      padding: 12,
      backgroundColor: '#E5E5EA',
      borderRadius: 8,
      minWidth: 100,
    },
    presetButtonActive: {
      backgroundColor: '#007AFF',
    },
    presetText: {
      fontSize: 14,
      color: '#666',
      fontWeight: '500',
      marginBottom: 4,
    },
    presetTextActive: {
      color: '#FFFFFF',
    },
    presetDescription: {
      fontSize: 12,
      color: '#666',
      opacity: 0.8,
    },
    presetDescriptionActive: {
      color: '#FFFFFF',
      opacity: 0.9,
    },
    advancedToggle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
      gap: 4,
    },
    advancedToggleText: {
      fontSize: 14,
      color: '#666',
      fontWeight: '500',
    },
    advancedControls: {
      marginTop: 8,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: '#E5E5EA',
    },
    advancedTitle: {
      fontSize: 14,
      color: '#666',
      marginBottom: 8,
    },
    easingScroll: {
      marginBottom: 16,
    },
    easingButtons: {
      flexDirection: 'row',
      gap: 8,
      paddingHorizontal: 4,
    },
    easingButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      backgroundColor: '#E5E5EA',
      borderRadius: 16,
    },
    easingButtonActive: {
      backgroundColor: '#007AFF',
    },
    easingText: {
      fontSize: 12,
      color: '#666',
      fontWeight: '500',
    },
    customParams: {
      marginTop: 16,
      padding: 12,
      backgroundColor: '#FFF',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#E5E5EA',
    },
    paramLabel: {
      fontSize: 14,
      color: '#666',
      marginBottom: 8,
    },
    paramSlider: {
      height: 40,
      marginBottom: 4,
    },
    paramValue: {
      fontSize: 12,
      color: '#666',
      textAlign: 'center',
    },
});
  
export default AnimationControls;