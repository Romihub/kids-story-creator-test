// src/components/gallery/GalleryItem.tsx
import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Drawing, Story } from '../../types/gallery';

interface GalleryItemProps {
  item: Drawing | Story;
  onPress: () => void;
  onDelete: () => void;
}

export const GalleryItem: React.FC<GalleryItemProps> = ({
  item,
  onPress,
  onDelete,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.overlay}>
        <Text style={styles.title}>
          {item.type === 'drawing' ? 'Drawing' : 'Story'}
        </Text>
        <Text style={styles.date}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={onDelete}
        >
          <Icon name="trash-can-outline" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  list: {
    padding: 8,
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    color: '#FFF',
    fontSize: 12,
    marginTop: 4,
  },
  deleteButton: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    padding: 4,
  },
});