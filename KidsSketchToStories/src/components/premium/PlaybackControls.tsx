import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface PlaybackControlsProps {
  onPlay: () => void;
  onPause?: () => void;
  onReset?: () => void;
  hasMoreStrokes: boolean;
  isPlaying?: boolean;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  onPlay,
  onPause,
  onReset,
  hasMoreStrokes,
  isPlaying = false,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={isPlaying ? onPause : onPlay}
        disabled={!hasMoreStrokes}
      >
        <Icon 
          name={isPlaying ? 'pause' : 'play'} 
          size={24} 
          color={hasMoreStrokes ? '#007AFF' : '#999'} 
        />
      </TouchableOpacity>
      {onReset && (
        <TouchableOpacity style={styles.button} onPress={onReset}>
          <Icon name="restart" size={24} color="#007AFF" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  button: {
    padding: 8,
    marginHorizontal: 8,
  },
}); 