// src/components/story/StoryViewer.tsx
import React, { useState } from 'react';
import { 
  View, 
  ScrollView, 
  Text, 
  StyleSheet, 
  Dimensions,
  Image,
  TouchableOpacity 
} from 'react-native';
import { Story, StoryPage } from '../../types/story';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface StoryViewerProps {
  story: Story;
  onPageChange?: (pageIndex: number) => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({
  story,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < story.pages.length) {
      setCurrentPage(newIndex);
      onPageChange?.(newIndex);
    }
  };

  const renderPage = (page: StoryPage) => (
    <View style={styles.pageContainer}>
      {page.drawing?.imageUrl && (
        <Image
          source={{ uri: page.drawing.imageUrl }}
          style={styles.drawingImage}
          resizeMode="contain"
        />
      )}
      <Text style={styles.content}>{page.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const newPage = Math.round(
            e.nativeEvent.contentOffset.x / Dimensions.get('window').width
          );
          handlePageChange(newPage);
        }}
      >
        {story.pages.map((page, index) => (
          <View key={index} style={styles.page}>
            {renderPage(page)}
          </View>
        ))}
      </ScrollView>

      <View style={styles.navigation}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          <Icon 
            name="chevron-left" 
            size={30} 
            color={currentPage === 0 ? '#ccc' : '#007AFF'} 
          />
        </TouchableOpacity>

        <Text style={styles.pageIndicator}>
          {currentPage + 1} / {story.pages.length}
        </Text>

        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === story.pages.length - 1}
        >
          <Icon 
            name="chevron-right" 
            size={30} 
            color={currentPage === story.pages.length - 1 ? '#ccc' : '#007AFF'} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    width: Dimensions.get('window').width,
    padding: 16,
  },
  pageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  drawingImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  content: {
    fontSize: 18,
    lineHeight: 24,
    color: '#333',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navButton: {
    padding: 8,
  },
  pageIndicator: {
    fontSize: 16,
    color: '#666',
  },
});

export default StoryViewer;