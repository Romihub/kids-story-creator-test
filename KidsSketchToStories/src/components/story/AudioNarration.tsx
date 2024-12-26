// src/components/story/AudioNarration.tsx
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

interface AudioNarrationProps {
  storyId: string;
  audioUrl?: string;
}

export const AudioNarration: React.FC<AudioNarrationProps> = ({ storyId, audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playTime, setPlayTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [speed, setSpeed] = useState(1);
  const audioPlayer = new AudioRecorderPlayer();

  useEffect(() => {
    return () => {
      if (isPlaying) {
        audioPlayer.stopPlayer();
      }
    };
  }, []);

  const togglePlayback = async () => {
    try {
      if (isPlaying) {
        await audioPlayer.stopPlayer();
        audioPlayer.removePlayBackListener();
        setIsPlaying(false);
      } else if (audioUrl) {
        await audioPlayer.startPlayer(audioUrl);
        audioPlayer.addPlayBackListener((e) => {
          setPlayTime(audioPlayer.mmssss(Math.floor(e.currentPosition)));
          setDuration(audioPlayer.mmssss(Math.floor(e.duration)));
          if (e.currentPosition === e.duration) {
            audioPlayer.stopPlayer();
            setIsPlaying(false);
          }
        });
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Playback error:', error);
    }
  };

  const changeSpeed = async () => {
    const newSpeed = speed === 2 ? 0.5 : speed + 0.5;
    setSpeed(newSpeed);
    if (isPlaying) {
      await audioPlayer.setPlaybackSpeed(newSpeed);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={togglePlayback}>
        <Icon 
          name={isPlaying ? 'pause-circle' : 'play-circle'} 
          size={32} 
          color="#007AFF" 
        />
        <Text style={styles.buttonText}>
          {isPlaying ? 'Pause' : 'Play'} Narration
        </Text>
      </TouchableOpacity>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{playTime} / {duration}</Text>
      </View>
      <TouchableOpacity style={styles.speedButton} onPress={changeSpeed}>
        <Text style={styles.speedText}>{speed}x</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007AFF',
  },
  timeContainer: {
    marginHorizontal: 8,
  },
  timeText: {
    fontSize: 14,
    color: '#666',
  },
  speedButton: {
    padding: 8,
    backgroundColor: '#E8E8E8',
    borderRadius: 4,
  },
  speedText: {
    fontSize: 14,
    color: '#666',
  },
}); 