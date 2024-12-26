// src/components/premium/CollaboratorsList.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import type { Collaborator } from '../../types/collaboration';

interface CollaboratorsListProps {
  collaborators: Collaborator[];
}

export const CollaboratorsList: React.FC<CollaboratorsListProps> = ({ collaborators }) => {
  return (
    <View style={styles.container}>
      {collaborators.map(collaborator => (
        <View key={collaborator.id} style={styles.collaborator}>
          {collaborator.avatar ? (
            <Image source={{ uri: collaborator.avatar }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.placeholder]}>
              <Text style={styles.initial}>{collaborator.name[0]}</Text>
            </View>
          )}
          <View style={[styles.status, { backgroundColor: collaborator.isActive ? '#4CAF50' : '#999' }]} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  collaborator: {
    marginHorizontal: 4,
    position: 'relative',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  placeholder: {
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initial: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 1,
    borderColor: '#FFF',
  },
}); 