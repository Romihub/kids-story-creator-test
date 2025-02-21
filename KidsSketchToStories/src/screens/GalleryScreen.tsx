import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchGallery,
  deleteDrawing,
  selectGalleryDrawings,
  selectGalleryLoading,
  selectGalleryError,
} from '../store/slices/gallerySlice';
import type { NavigationProps } from '../types/navigation';
import Svg, { Path } from 'react-native-svg';
import { SavedDrawing, DrawingPath } from '../types/drawing';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const DrawingThumbnail: React.FC<{ drawing: SavedDrawing }> = ({ drawing }) => {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useAppDispatch();

  const handleDelete = useCallback(async () => {
    try {
      await dispatch(deleteDrawing(drawing.id)).unwrap();
      dispatch(fetchGallery());
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Failed to delete drawing'
      );
    }
  }, [dispatch, drawing.id]);

  const handlePress = useCallback(() => {
    // Navigate to Drawing screen in view mode
    navigation.navigate('Drawing', { 
      id: drawing.id,
      mode: 'view'
    });
  }, [navigation, drawing.id]);

  const handleLongPress = useCallback(() => {
    Alert.alert(
      'Delete Drawing',
      'Are you sure you want to delete this drawing?',
      [
        { 
          text: 'Cancel', 
          style: 'cancel',
          onPress: () => {} // Explicitly handle cancel
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            handleDelete().catch(() => {
              Alert.alert('Error', 'Failed to delete drawing', [{ text: 'OK' }]);
            });
          }
        }
      ],
      { 
        cancelable: true,
        onDismiss: () => {}
      }
    );
  }, [handleDelete]);

  return (
    <TouchableOpacity
      style={styles.thumbnailContainer}
      onPress={handlePress}
      onLongPress={handleLongPress}
      delayLongPress={500}
    >
      <View style={styles.thumbnail}>
        <Svg width="100%" height="100%" viewBox="0 0 300 300">
          {drawing.paths.map((path: DrawingPath, index: number) => (
            <Path
              key={`${index}-${path.timestamp}`}
              d={path.data}
              stroke={path.color}
              strokeWidth={path.strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </Svg>
      </View>
      <Text style={styles.timestamp}>
        {new Date(drawing.timestamp).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );
};

function DrawingsTab() {
  const dispatch = useAppDispatch();
  const drawings = useAppSelector(selectGalleryDrawings);
  const loading = useAppSelector(selectGalleryLoading);
  const error = useAppSelector(selectGalleryError);
  const [refreshing, setRefreshing] = useState(false);

  const loadGallery = useCallback(() => {
    dispatch(fetchGallery());
  }, [dispatch]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(fetchGallery());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    loadGallery();
  }, [loadGallery]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => dispatch(fetchGallery())}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!drawings.length) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No drawings yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={drawings}
        renderItem={({ item }) => <DrawingThumbnail drawing={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#007AFF']} // Android
            tintColor="#007AFF" // iOS
          />
        }
      />
    </View>
  );
}

function StoriesTab() {
  return (
    <View style={styles.centerContainer}>
      <Text style={styles.emptyText}>No stories generated yet</Text>
    </View>
  );
}

export const GalleryScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999999',
        tabBarIndicatorStyle: { backgroundColor: '#007AFF' },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#E0E0E0',
        },
      }}
    >
      <Tab.Screen 
        name="Drawings" 
        component={DrawingsTab}
        options={{ title: 'Drawings' }}
      />
      <Tab.Screen 
        name="Stories" 
        component={StoriesTab}
        options={{ title: 'Stories' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  gridContainer: {
    padding: 8,
  },
  thumbnailContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
  },
  timestamp: {
    padding: 8,
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  errorText: {
    color: '#FF3B30',
    marginBottom: 16,
  },
  retryButton: {
    padding: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  emptyText: {
    color: '#666666',
    fontSize: 16,
  },
});

export default GalleryScreen;
