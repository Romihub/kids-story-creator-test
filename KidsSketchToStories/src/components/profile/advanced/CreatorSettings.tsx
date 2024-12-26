import React from 'react';
import { View, Text, Switch, TextInput, StyleSheet } from 'react-native';

interface CreatorSettingsProps {
  watermark: boolean;
  autoPublish: boolean;
  copyrightInfo: string;
  onUpdate: (settings: {
    watermark?: boolean;
    autoPublish?: boolean;
    copyright?: string;
  }) => void;
}

export const CreatorSettings: React.FC<CreatorSettingsProps> = ({
  watermark,
  autoPublish,
  copyrightInfo,
  onUpdate,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Creator Settings</Text>
      
      <View style={styles.setting}>
        <Text style={styles.label}>Add Watermark</Text>
        <Switch
          value={watermark}
          onValueChange={(value) => onUpdate({ watermark: value })}
        />
      </View>

      <View style={styles.setting}>
        <Text style={styles.label}>Auto-Publish</Text>
        <Switch
          value={autoPublish}
          onValueChange={(value) => onUpdate({ autoPublish: value })}
        />
      </View>

      <View style={styles.setting}>
        <Text style={styles.label}>Copyright Info</Text>
        <TextInput
          style={styles.input}
          value={copyrightInfo}
          onChangeText={(text) => onUpdate({ copyright: text })}
          placeholder="Enter copyright information"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    flex: 1,
    marginLeft: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 4,
  },
}); 