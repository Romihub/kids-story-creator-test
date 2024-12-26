// src/components/profile/ActivityHistory.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useActivityStats } from '../../hooks/useActivityStats';

export const ActivityHistory: React.FC = () => {
  const { stats } = useActivityStats();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Activity</Text>
      <FlatList
        data={stats.activities}
        renderItem={({ item }) => (
          <View style={styles.activityItem}>
            <Text style={styles.activityType}>{item.type}</Text>
            <Text style={styles.activityCount}>{item.count}</Text>
          </View>
        )}
        keyExtractor={(item) => item.type}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  activityType: {
    fontSize: 14,
  },
  activityCount: {
    fontSize: 14,
    color: '#666',
  },
}); 