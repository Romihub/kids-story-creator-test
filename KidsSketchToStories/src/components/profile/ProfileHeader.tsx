// src/components/profile/ProfileHeader.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { User } from '../../types/auth';
import { Profile } from '../../types/profile';

export interface ProfileHeaderProps {
  user: User;
  profile: Profile;
  onEdit?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  profile,
  onEdit,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainInfo}>
        <Image
          source={{ uri: profile.avatar || 'https://via.placeholder.com/100' }}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{profile.displayName}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>
      {onEdit && (
        <TouchableOpacity onPress={onEdit} style={styles.editButton}>
          <Icon name="pencil" size={24} color="#007AFF" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  mainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  editButton: {
    padding: 8,
  },
}); 