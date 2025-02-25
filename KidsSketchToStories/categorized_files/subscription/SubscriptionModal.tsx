// src/components/subscription/SubscriptionModal.tsx
import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { subscriptionTiers } from '../../services/subscription';
import { useSubscription } from '../../hooks/useSubscription';

interface SubscriptionModalProps {
  visible: boolean;
  onClose: () => void;
}

interface Feature {
  [key: string]: boolean | number | string;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  visible,
  onClose,
}) => {
  const { subscribe } = useSubscription();

  const handleSubscribe = async (tierId: string) => {
    try {
      await subscribe(tierId);
      onClose();
    } catch (error) {
      // Handle error
    }
  };

  const formatFeature = (feature: string, value: Feature[keyof Feature]) => {
    if (typeof value === 'boolean') {
      return feature;
    }
    return `${feature}: ${value}`;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>Choose Your Plan</Text>
          {subscriptionTiers.map((tier) => (
            <TouchableOpacity
              key={tier.id}
              style={styles.tierCard}
              onPress={() => handleSubscribe(tier.id)}
            >
              <Text style={styles.tierName}>{tier.name}</Text>
              <Text style={styles.price}>
                ${tier.price.toFixed(2)}/month
              </Text>
              <View style={styles.features}>
                {Object.entries(tier.features).map(([feature, value]) => (
                  <View key={feature} style={styles.featureRow}>
                    <Icon
                      name={typeof value === 'boolean' && value ? 'check' : 'x'}
                      size={20}
                      color={typeof value === 'boolean' && value ? '#4CAF50' : '#F44336'}
                    />
                    <Text style={styles.featureText}>
                      {formatFeature(feature, value)}
                    </Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  content: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  tierCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
  },
  tierName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    color: '#007AFF',
    marginBottom: 16,
  },
  features: {
    gap: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#666',
  },
});