// src/components/profile/ConnectedAccountCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ConnectedAccount {
  id: string;
  provider: string;
  username: string;
  avatar?: string;
  lastSync?: string;
}

interface ConnectedAccountCardProps {
  account: ConnectedAccount;
  onUnlink: () => void;
}

export const ConnectedAccountCard: React.FC<ConnectedAccountCardProps> = ({
  account,
  onUnlink,
}) => {
  const getProviderIcon = (provider: string) => {
    switch (provider.toLowerCase()) {
      case 'google': return 'google';
      case 'apple': return 'apple';
      case 'facebook': return 'facebook';
      default: return 'account';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.accountInfo}>
        <Icon 
          name={getProviderIcon(account.provider)} 
          size={24} 
          color="#333"
        />
        <View style={styles.details}>
          <Text style={styles.provider}>{account.provider}</Text>
          <Text style={styles.username}>{account.username}</Text>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.unlinkButton}
        onPress={onUnlink}
      >
        <Icon name="link-off" size={20} color="#FF3B30" />
        <Text style={styles.unlinkText}>Unlink</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  details: {
    marginLeft: 12,
  },
  provider: {
    fontSize: 14,
    fontWeight: '600',
  },
  username: {
    fontSize: 12,
    color: '#666',
  },
  unlinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  unlinkText: {
    marginLeft: 4,
    color: '#FF3B30',
    fontSize: 14,
  },
}); 