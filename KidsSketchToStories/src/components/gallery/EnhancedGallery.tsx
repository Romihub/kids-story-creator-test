// src/components/gallery/EnhancedGallery.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSubscription } from '../../hooks/useSubscription';
import type { Drawing, Story } from '../../types/gallery';
import { FolderOrganizer } from './premium/FolderOrganizer';
import { SearchBar } from './premium/SearchBar';
import { BulkActionTools } from './premium/BulkActionTools';
import { GalleryList } from './GalleryList';

export const EnhancedGallery: React.FC = () => {
    const { tier } = useSubscription();
    const [items, setItems] = useState<Array<Drawing | Story>>([]);
    
    const features = {
      folders: tier.id !== 'free',
      search: tier.id !== 'free',
      bulkActions: tier.id === 'professional',
      sharing: tier.id !== 'free',
    };
  
    const handleDelete = (id: string) => {
      setItems(prev => prev.filter(item => item.id !== id));
    };

    return (
      <View style={styles.container}>
        {features.folders && <FolderOrganizer />}
        {features.search && <SearchBar />}
        {features.bulkActions && <BulkActionTools />}
        <GalleryList 
          items={items}
          onDelete={handleDelete}
          showSharingOptions={features.sharing}
          maxItems={tier.features.maxStories}
        />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});