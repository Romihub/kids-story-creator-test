import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  date?: string;
}

interface MilestoneTimelineProps {
  milestones: Milestone[];
  onMilestonePress: (id: string) => void;
}

export const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({
  milestones,
  onMilestonePress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Learning Milestones</Text>
      <ScrollView style={styles.timeline}>
        {milestones.map((milestone, index) => (
          <TouchableOpacity
            key={milestone.id}
            style={styles.milestone}
            onPress={() => onMilestonePress(milestone.id)}
          >
            <View style={styles.timelineConnector}>
              <View style={[
                styles.dot,
                milestone.completed && styles.completedDot
              ]} />
              {index < milestones.length - 1 && (
                <View style={[
                  styles.line,
                  milestone.completed && styles.completedLine
                ]} />
              )}
            </View>
            <View style={styles.content}>
              <Text style={styles.milestoneTitle}>{milestone.title}</Text>
              {milestone.date && (
                <Text style={styles.date}>{milestone.date}</Text>
              )}
              {milestone.completed && (
                <Icon name="check-circle" size={20} color="#34C759" />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  timeline: {
    maxHeight: 300,
  },
  milestone: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineConnector: {
    width: 24,
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#DDD',
  },
  completedDot: {
    backgroundColor: '#34C759',
  },
  line: {
    width: 2,
    height: 40,
    backgroundColor: '#DDD',
    marginTop: 4,
  },
  completedLine: {
    backgroundColor: '#34C759',
  },
  content: {
    flex: 1,
    marginLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  milestoneTitle: {
    fontSize: 14,
    flex: 1,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginHorizontal: 8,
  },
}); 