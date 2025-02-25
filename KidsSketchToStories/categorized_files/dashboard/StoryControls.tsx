//src/components/story/StoryControls.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface StoryControlsProps {
  onRegenerate: () => void;
  onShare: () => void;
  onUpdate: (data: any) => void;
  canShare?: boolean;
  regenerationsLeft?: number;
}

export const StoryControls: React.FC<StoryControlsProps> = ({
  onRegenerate,
  onShare,
  onUpdate,
  canShare = true,
  regenerationsLeft = 3,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={onRegenerate}
        disabled={regenerationsLeft === 0}
      >
        <Icon name="refresh" size={24} color={regenerationsLeft > 0 ? '#007AFF' : '#ccc'} />
        <Text style={[styles.buttonText, regenerationsLeft === 0 && styles.disabledText]}>
          Regenerate ({regenerationsLeft})
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={onShare}
        disabled={!canShare}
      >
        <Icon name="share" size={24} color={canShare ? '#007AFF' : '#ccc'} />
        <Text style={[styles.buttonText, !canShare && styles.disabledText]}>
          Share
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => onUpdate({ editing: true })}
      >
        <Icon name="edit" size={24} color="#007AFF" />
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007AFF',
  },
  disabledText: {
    color: '#ccc',
  },
});