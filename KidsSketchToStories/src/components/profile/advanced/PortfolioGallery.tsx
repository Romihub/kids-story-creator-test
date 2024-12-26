// src/components/profile/advanced/PortfolioGallery.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

interface PortfolioItem {
  id: string;
  title: string;
  thumbnail: string;
}

interface PortfolioGalleryProps {
  items: PortfolioItem[];
  onItemPress: (id: string) => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  items,
  onItemPress,
}) => {
  const renderItem = ({ item }: { item: PortfolioItem }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => onItemPress(item.id)}
    >
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.thumbnail}
      />
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Portfolio</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  row: {
    justifyContent: 'space-between',
  },
  item: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  thumbnail: {
    width: '100%',
    height: 120,
    backgroundColor: '#F0F0F0',
  },
  title: {
    padding: 8,
    fontSize: 14,
  },
}); 