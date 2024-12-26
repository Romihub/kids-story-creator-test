// src/components/profile/AchievementCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  unlocked: boolean;
  reward?: string;
}

interface AchievementCardProps {
  achievement: Achievement;
  onPress: () => void;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon
          name={achievement.unlocked ? 'trophy' : 'trophy-outline'}
          size={24}
          color={achievement.unlocked ? '#FFD700' : '#666'}
        />
      </View>
      <Text style={styles.title}>{achievement.title}</Text>
      <Text style={styles.description}>{achievement.description}</Text>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill,
            { width: `${achievement.progress}%` }
          ]} 
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    padding: 12,
    marginRight: 12,
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
}); 