import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import AudioRecorderPlayer, {
  AudioSet,
  AudioSourceAndroidType,
  AudioEncoderAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  PlayBackType,
  RecordBackType,
} from 'react-native-audio-recorder-player';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface VoiceNarrationProps {
  storyId: string;
  text: string;
  onRecordingComplete?: (audioPath: string) => void;
}

export const VoiceNarration: React.FC<VoiceNarrationProps> = ({
  storyId,
  text,
  onRecordingComplete
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState('00:00');
  const [audioPath, setAudioPath] = useState<string>('');
  const [hasPermission, setHasPermission] = useState(false);
  const audioRecorderPlayer = new AudioRecorderPlayer();

  useEffect(() => {
    checkPermission();
    return () => {
      if (isRecording) {
        audioRecorderPlayer.stopRecorder();
      }
      if (isPlaying) {
        audioRecorderPlayer.stopPlayer();
      }
    };
  }, []);

  const checkPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);

        const granted = 
          grants['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED;

        setHasPermission(granted);
      } catch (err) {
        console.warn(err);
        setHasPermission(false);
      }
    } else {
      setHasPermission(true);
    }
  };

  const startRecording = async () => {
    if (!hasPermission) {
      console.warn('No permission to record');
      return;
    }

    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    const path = Platform.select({
      ios: `${storyId}_narration.m4a`,
      android: `${storyId}_narration.mp4`,
    });

    try {
      const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
      audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
        setRecordingTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      });
      setIsRecording(true);
      setAudioPath(uri);
    } catch (error) {
      console.error('Recording failed to start:', error);
    }
  };

  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setIsRecording(false);
      setRecordingTime('00:00');
      onRecordingComplete?.(result);
    } catch (error) {
      console.error('Recording failed to stop:', error);
    }
  };

  const startPlaying = async () => {
    try {
      await audioRecorderPlayer.startPlayer(audioPath);
      audioRecorderPlayer.addPlayBackListener((e) => {
        if (e.currentPosition === e.duration) {
          audioRecorderPlayer.stopPlayer();
          setIsPlaying(false);
        }
      });
      setIsPlaying(true);
    } catch (error) {
      console.error('Failed to start playing:', error);
    }
  };

  const stopPlaying = async () => {
    try {
      await audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
      setIsPlaying(false);
    } catch (error) {
      console.error('Failed to stop playing:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        {!isRecording && !isPlaying && (
          <TouchableOpacity
            style={styles.recordButton}
            onPress={startRecording}
          >
            <Icon name="microphone" size={32} color="#FFFFFF" />
            <Text style={styles.buttonText}>Start Recording</Text>
          </TouchableOpacity>
        )}

        {isRecording && (
          <TouchableOpacity
            style={[styles.recordButton, styles.recording]}
            onPress={stopRecording}
          >
            <Icon name="stop" size={32} color="#FFFFFF" />
            <Text style={styles.buttonText}>{recordingTime}</Text>
          </TouchableOpacity>
        )}

        {!isRecording && audioPath && (
          <TouchableOpacity
            style={styles.playButton}
            onPress={isPlaying ? stopPlaying : startPlaying}
          >
            <Icon
              name={isPlaying ? 'stop' : 'play'}
              size={32}
              color="#FFFFFF"
            />
            <Text style={styles.buttonText}>
              {isPlaying ? 'Stop' : 'Play'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  recordButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
  },
  recording: {
    backgroundColor: '#FF3B30',
  },
  playButton: {
    backgroundColor: '#34C759',
    padding: 16,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
  },
  buttonText: {
    color: '#FFFFFF',
    marginTop: 8,
    fontSize: 12,
  }
});

export default VoiceNarration;