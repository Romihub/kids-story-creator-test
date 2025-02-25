// src/components/profile/SubscriptionSection.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const SubscriptionSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subscription</Text>
      <TouchableOpacity style={styles.planCard}>
        <Icon name="star" size={24} color="#FFD700" />
        <View style={styles.planInfo}>
          <Text style={styles.planName}>Free Plan</Text>
          <Text style={styles.planDescription}>Basic features included</Text>
        </View>
        <Icon name="chevron-right" size={24} color="#666" />
      </TouchableOpacity>
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
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
  },
  planInfo: {
    flex: 1,
    marginLeft: 12,
  },
  planName: {
    fontSize: 14,
    fontWeight: '500',
  },
  planDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
}); 