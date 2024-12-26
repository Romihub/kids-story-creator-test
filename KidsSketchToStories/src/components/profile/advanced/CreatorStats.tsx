// src/components/profile/advanced/CreatorStats.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface CreatorStatsProps {
  totalStories: number;
  totalLikes: number;
  avgRating: number;
}

export const CreatorStats: React.FC<CreatorStatsProps> = ({
  totalStories,
  totalLikes,
  avgRating,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.statItem}>
        <Icon name="book" size={24} color="#007AFF" />
        <Text style={styles.statValue}>{totalStories}</Text>
        <Text style={styles.statLabel}>Stories</Text>
      </View>
      <View style={styles.statItem}>
        <Icon name="heart" size={24} color="#FF2D55" />
        <Text style={styles.statValue}>{totalLikes}</Text>
        <Text style={styles.statLabel}>Likes</Text>
      </View>
      <View style={styles.statItem}>
        <Icon name="star" size={24} color="#FFD700" />
        <Text style={styles.statValue}>{avgRating.toFixed(1)}</Text>
        <Text style={styles.statLabel}>Rating</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
}); 