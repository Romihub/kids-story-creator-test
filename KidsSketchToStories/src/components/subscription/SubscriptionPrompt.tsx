//src/components/subscription/SubscriptionPrompt.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface SubscriptionPromptProps {
  onUpgrade: () => void;
  onClose: () => void;
}

export const SubscriptionPrompt: React.FC<SubscriptionPromptProps> = ({
  onUpgrade,
  onClose,
}) => {
  return (
    <View style={styles.container}>
      <Icon name="star" size={24} color="#FFD700" />
      <Text style={styles.title}>Upgrade to Premium</Text>
      <Text style={styles.description}>
        Unlock unlimited storage and more features
      </Text>
      <TouchableOpacity style={styles.upgradeButton} onPress={onUpgrade}>
        <Text style={styles.buttonText}>Upgrade Now</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeText}>Maybe Later</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  upgradeButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    //marginTop: 8,
    padding: 8,
  },
  closeText: {
    color: '#666',
    fontSize: 14,
  },
});

export default SubscriptionPrompt;