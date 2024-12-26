// src/components/profile/advanced/ChallengeBoard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Challenge {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface ChallengeBoardProps {
  challenges: Challenge[];
  onChallengeSelect: (id: string) => void;
}

export const ChallengeBoard: React.FC<ChallengeBoardProps> = ({
  challenges,
  onChallengeSelect,
}) => {
  const renderChallenge = ({ item: challenge }: { item: Challenge }) => (
    <TouchableOpacity
      style={[styles.challenge, challenge.completed && styles.completedChallenge]}
      onPress={() => onChallengeSelect(challenge.id)}
    >
      <View style={styles.challengeContent}>
        <Text style={styles.challengeTitle}>{challenge.title}</Text>
        <Text style={styles.challengeDescription}>{challenge.description}</Text>
      </View>
      {challenge.completed ? (
        <Icon name="trophy" size={24} color="#FFD700" />
      ) : (
        <Icon name="chevron-right" size={24} color="#666" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Learning Challenges</Text>
      <FlatList
        data={challenges}
        renderItem={renderChallenge}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  list: {
    maxHeight: 300,
  },
  challenge: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginBottom: 8,
  },
  completedChallenge: {
    backgroundColor: '#F0F8FF',
    borderColor: '#007AFF',
    borderWidth: 1,
  },
  challengeContent: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  challengeDescription: {
    fontSize: 12,
    color: '#666',
  },
}); 