// src/components/profile/settings/DataManagement.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface DataManagementProps {
  onExportData?: () => Promise<void>;
  onDeleteAccount?: () => Promise<void>;
}

export const DataManagement: React.FC<DataManagementProps> = ({
  onExportData,
  onDeleteAccount,
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportData = async () => {
    if (!onExportData) return;
    setIsExporting(true);
    try {
      await onExportData();
      Alert.alert('Success', 'Your data has been exported successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to export data');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await onDeleteAccount?.();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete account');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Management</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={handleExportData}
        disabled={isExporting}
      >
        <Icon name="download" size={24} color="#007AFF" />
        <Text style={styles.buttonText}>
          {isExporting ? 'Exporting...' : 'Export My Data'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.deleteButton]}
        onPress={handleDeleteAccount}
      >
        <Icon name="delete" size={24} color="#FF3B30" />
        <Text style={[styles.buttonText, styles.deleteText]}>
          Delete Account
        </Text>
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
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#FFF0F0',
  },
  deleteText: {
    color: '#FF3B30',
  },
}); 