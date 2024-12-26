//src/components/gallery/GalleryHeader.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface GalleryHeaderProps {
  onFilterChange?: (filter: 'all' | 'drawings' | 'stories') => void;
  currentFilter?: 'all' | 'drawings' | 'stories';
}

export const GalleryHeader: React.FC<GalleryHeaderProps> = ({
  onFilterChange,
  currentFilter = 'all',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Gallery</Text>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            currentFilter === 'all' && styles.activeFilter,
          ]}
          onPress={() => onFilterChange?.('all')}
        >
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            currentFilter === 'drawings' && styles.activeFilter,
          ]}
          onPress={() => onFilterChange?.('drawings')}
        >
          <Icon name="brush" size={16} color="#666" />
          <Text style={styles.filterText}>Drawings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            currentFilter === 'stories' && styles.activeFilter,
          ]}
          onPress={() => onFilterChange?.('stories')}
        >
          <Icon name="book" size={16} color="#666" />
          <Text style={styles.filterText}>Stories</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  activeFilter: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    marginLeft: 4,
    color: '#666',
  },
});