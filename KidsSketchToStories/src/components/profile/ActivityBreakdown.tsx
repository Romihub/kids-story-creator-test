// src/components/profile/ActivityBreakdown.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Activity {
  type: string;
  count: number;
  icon: string;
  color: string;
}

interface ActivityBreakdownProps {
  activities: Activity[];
}

export const ActivityBreakdown: React.FC<ActivityBreakdownProps> = ({
  activities,
}) => {
  const total = activities.reduce((sum, activity) => sum + activity.count, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity Breakdown</Text>
      {activities.map((activity) => (
        <View key={activity.type} style={styles.activityRow}>
          <View style={styles.activityInfo}>
            <Icon name={activity.icon} size={24} color={activity.color} />
            <Text style={styles.activityType}>{activity.type}</Text>
          </View>
          <View style={styles.stats}>
            <Text style={styles.count}>{activity.count}</Text>
            <Text style={styles.percentage}>
              {((activity.count / total) * 100).toFixed(1)}%
            </Text>
          </View>
        </View>
      ))}
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
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  activityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityType: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  count: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
  },
  percentage: {
    fontSize: 12,
    color: '#666',
    width: 50,
    textAlign: 'right',
  },
}); 