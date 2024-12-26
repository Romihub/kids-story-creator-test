// src/components/gallery/GalleryList.tsx
import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GalleryItem } from './GalleryItem';
import { SubscriptionPrompt } from '../subscription/SubscriptionPrompt';
import type { Drawing, Story } from '../../types/gallery';
import type { NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../types/navigation';

interface GalleryListProps {
  items: Array<Drawing | Story>;
  onDelete: (id: string) => void;
  maxItems: number;
  showSharingOptions: boolean;
}

export const GalleryList: React.FC<GalleryListProps> = ({
  items,
  onDelete,
  maxItems,
  showSharingOptions,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const renderItem = ({ item }: { item: Drawing | Story }) => (
    <GalleryItem
      item={item}
      onPress={() => navigation.navigate(
        item.type === 'drawing' 
          ? 'Drawing' as const
          : 'Story' as const,
        { id: item.id }
      )}
      onDelete={() => onDelete(item.id)}
    />
  );

  const handleUpgradeSubscription = () => {
    navigation.navigate('Subscription');
  };

  const handleClosePrompt = () => {
    // Handle closing the subscription prompt
    // You might want to store this preference
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<EmptyGallery />}
        ListFooterComponent={
          items.length >= maxItems ? (
            <SubscriptionPrompt 
              onUpgrade={handleUpgradeSubscription}
              onClose={handleClosePrompt}
            />
          ) : null
        }
      />
    </View>
  );
};

// EmptyGallery component if not already defined elsewhere
const EmptyGallery: React.FC = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>
      No items yet. Start creating!
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  list: {
    padding: 8,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 200,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default GalleryList;