import React from 'react';
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
import { useAuth } from '../hooks/useAuth';
import type { NavigationProps, GalleryTabParamList, MaterialTopTabNavigatorProps } from '../types/navigation';
import Svg, { Path } from 'react-native-svg';
import { SavedDrawing, DrawingPath } from '../types/drawing';
import { createMaterialTopTabNavigator, MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import { colors, typography, spacing, borderRadius } from '../themes/theme';
import { Card } from '../components/shared/Card';
import { Button } from '../components/shared/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialTopTabNavigator<GalleryTabParamList>();

const DrawingThumbnail: React.FC<{ drawing: SavedDrawing }> = ({ drawing }) => {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteDrawing(drawing.id)).unwrap();
      dispatch(fetchGallery());
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Failed to delete drawing'
      );
    }
  };

  const handlePress = () => {
    navigation.navigate('Drawing', { 
      id: drawing.id,
      mode: 'view'
    });
  };

  const handleLongPress = () => {
    Alert.alert(
      'Delete Drawing',
      'Are you sure you want to delete this drawing?',
      [
        { 
          text: 'Cancel', 
          style: 'cancel',
          onPress: () => {}
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
      { cancelable: true }
    );
  };

  const renderPaths = () => {
    return drawing.paths.map((path: DrawingPath, index: number) => {
      const { data, color, strokeWidth } = path;
      return React.createElement(Path, {
        d: data,
        stroke: color,
        strokeWidth: strokeWidth,
        fill: "none",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        key: `${index}-${path.timestamp}`
      });
    });
  };

  return (
    <Card 
      variant="secondary" 
      style={styles.thumbnailContainer}
      children={
        <TouchableOpacity
          onPress={handlePress}
          onLongPress={handleLongPress}
          delayLongPress={500}
          style={styles.thumbnail}
        >
          <Svg width="100%" height="100%" viewBox="0 0 300 300">
            {renderPaths()}
          </Svg>
          <Text style={styles.timestamp}>
            {new Date(drawing.timestamp).toLocaleDateString()}
          </Text>
        </TouchableOpacity>
      }
    />
  );
};

const EmptyState: React.FC<{
  icon: string;
  title: string;
  message: string;
  action?: () => void;
  actionLabel?: string;
}> = ({ icon, title, message, action, actionLabel }) => (
  <View style={styles.emptyStateContainer}>
    <MaterialCommunityIcons name={icon} size={64} color={colors.text.disabled} style={styles.emptyStateIcon} />
    <Text style={styles.emptyStateTitle}>{title}</Text>
    <Text style={styles.emptyStateMessage}>{message}</Text>
    {action && actionLabel && (
      <Button
        title={actionLabel}
        onPress={action}
        variant="primary"
        style={styles.emptyStateButton}
      />
    )}
  </View>
);

function DrawingsTab() {
  const dispatch = useAppDispatch();
  const drawings = useAppSelector(selectGalleryDrawings);
  const loading = useAppSelector(selectGalleryLoading);
  const error = useAppSelector(selectGalleryError);
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation<NavigationProps>();
  const { isAuthenticated } = useAuth();

  const handleRefresh = React.useCallback(async () => {
    if (!isAuthenticated) return;
    setRefreshing(true);
    await dispatch(fetchGallery());
    setRefreshing(false);
  }, [dispatch, isAuthenticated]);

  React.useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchGallery());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <EmptyState
        icon="login"
        title="Sign In Required"
        message="Please sign in to view your drawings"
        action={() => navigation.navigate('Auth', { screen: 'SignIn' })}
        actionLabel="Sign In"
      />
    );
  }

  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <EmptyState
        icon="alert-circle-outline"
        title="Oops!"
        message={error}
        action={() => dispatch(fetchGallery())}
        actionLabel="Try Again"
      />
    );
  }

  if (!drawings.length) {
    return (
      <EmptyState
        icon="pencil"
        title="No Drawings Yet"
        message="Start creating your magical stories by drawing something!"
        action={() => navigation.navigate('Drawing', { id: 'new' })}
        actionLabel="Start Drawing"
      />
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
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      />
    </View>
  );
}

function StoriesTab() {
  const { isAuthenticated } = useAuth();
  const navigation = useNavigation<NavigationProps>();

  if (!isAuthenticated) {
    return (
      <EmptyState
        icon="login"
        title="Sign In Required"
        message="Please sign in to view your stories"
        action={() => navigation.navigate('Auth', { screen: 'SignIn' })}
        actionLabel="Sign In"
      />
    );
  }

  return (
    <EmptyState
      icon="book-open-variant"
      title="No Stories Yet"
      message="Your generated stories will appear here"
    />
  );
}

const tabScreenOptions: MaterialTopTabNavigationOptions = {
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.text.disabled,
  tabBarIndicatorStyle: { 
    backgroundColor: colors.primary,
    height: 3,
    borderRadius: borderRadius.sm,
  },
  tabBarStyle: {
    backgroundColor: colors.background,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabBarLabelStyle: {
    ...typography.button,
    textTransform: 'none' as const,
  },
};

export function GalleryScreen() {
  const navigatorProps = {
    screenOptions: tabScreenOptions,
    initialRouteName: "Drawings" as const,
    children: (
      <>
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
      </>
    )
  } as const;

  return (
    <View style={styles.container}>
      <Tab.Navigator {...navigatorProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  gridContainer: {
    padding: spacing.md,
  },
  thumbnailContainer: {
    flex: 1,
    margin: spacing.xs,
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  timestamp: {
    ...typography.body2,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  emptyStateIcon: {
    marginBottom: spacing.md,
  },
  emptyStateTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyStateMessage: {
    ...typography.body1,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  emptyStateButton: {
    minWidth: 200,
  },
});
