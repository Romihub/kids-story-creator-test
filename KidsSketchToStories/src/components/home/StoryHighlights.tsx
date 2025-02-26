// src/components/home/StoryHighlights.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../themes/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../../types/navigation';

interface HighlightCardProps {
  id: string;
  title: string;
  icon: string;
  color: string;
  coverImage?: string;
  isNew?: boolean;
  onPress: () => void;
}

const HighlightCard = React.memo<HighlightCardProps>(({ 
  id, 
  title, 
  icon, 
  color, 
  coverImage, 
  isNew = false, 
  onPress 
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity 
      style={styles.cardTouchable} 
      onPress={onPress} 
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.7}
    >
      <Animated.View 
        style={[
          styles.card,
          { transform: [{ scale: scaleAnim }] }
        ]}
      >
        {coverImage ? (
          <Image source={{ uri: coverImage }} style={styles.coverImage} />
        ) : (
          <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
            <MaterialCommunityIcons name={icon} size={32} color={color} />
          </View>
        )}
        
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
          {isNew && (
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>NEW</Text>
            </View>
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
});

HighlightCard.displayName = 'HighlightCard';

export const StoryHighlights = () => {
  const navigation = useNavigation<NavigationProps>();

  // This would come from your API/state management in a real app
  const highlights = [
    {
      id: '1',
      title: 'Dragon Tale',
      icon: 'dragon',
      color: colors.primary,
      coverImage: null,
      isNew: true
    },
    {
      id: '2',
      title: 'Princess Party',
      icon: 'crown',
      color: colors.secondary,
      coverImage: null,
      isNew: false
    },
    {
      id: '3',
      title: 'Castle Adventure',
      icon: 'castle',
      color: colors.accent,
      coverImage: null,
      isNew: false
    },
    {
      id: '4',
      title: 'Space Journey',
      icon: 'rocket',
      color: '#4ECDC4',
      coverImage: null,
      isNew: true
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Today's Highlights</Text>
        <TouchableOpacity 
          style={styles.viewAllButton}
          onPress={() => navigation.navigate('Gallery')}
        >
          <Text style={styles.viewAllText}>View All</Text>
          <MaterialCommunityIcons name="chevron-right" size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {highlights.map(highlight => (
          <HighlightCard
            key={highlight.id}
            id={highlight.id}
            title={highlight.title}
            icon={highlight.icon}
            color={highlight.color}
            coverImage={highlight.coverImage}
            isNew={highlight.isNew}
            onPress={() => navigation.navigate('Story', { id: highlight.id })}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary + '10',
  },
  viewAllText: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '500',
    marginRight: spacing.xs,
  },
  scrollContent: {
    paddingRight: spacing.lg,
    paddingLeft: spacing.xs,
    paddingVertical: spacing.xs,
  },
  cardTouchable: {
    marginLeft: spacing.sm,
  },
  card: {
    width: 140,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.sm,
  },
  iconContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    ...typography.body2,
    color: colors.text.primary,
    fontWeight: '500',
    flex: 1,
  },
  newBadge: {
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: spacing.xs,
  },
  newBadgeText: {
    ...typography.caption,
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: 'bold',
  },
});

export default StoryHighlights;