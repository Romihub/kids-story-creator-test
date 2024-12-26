// src/screens/GalleryScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { GalleryList } from '../components/gallery/GalleryList';
import { GalleryHeader } from '../components/gallery/GalleryHeader';
import { useGallery } from '../hooks/useGallery';
import { useSubscription } from '../hooks/useSubscription';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
//import type { RootStackParamList } from '../navigation/AppNavigator';
import type { RootStackScreenProps } from '../navigation/AppNavigator';

//type Props = NativeStackScreenProps<RootStackParamList, 'Gallery'>;
type Props = RootStackScreenProps<'Gallery'>;

export const GalleryScreen: React.FC<Props> = ({ navigation }) => {
  const { drawings, stories, deleteItem } = useGallery();
  const { tier } = useSubscription();
  const [filter, setFilter] = useState<'all' | 'drawings' | 'stories'>('all');

  const filteredItems = () => {
    switch (filter) {
      case 'drawings':
        return drawings;
      case 'stories':
        return stories;
      default:
        return [...drawings, ...stories];
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <GalleryHeader
        onFilterChange={setFilter}
        currentFilter={filter}
      />
      <GalleryList
        items={filteredItems()}
        onDelete={deleteItem}
        maxItems={tier.maxItems}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  gridView: {
    padding: 10,
  },
  itemCard: {
    margin: 5,
    borderRadius: 8,
  }
});

export default GalleryScreen;