import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../themes/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../../types/navigation';

interface StoryCard {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
}

const STORY_CARDS: StoryCard[] = [
  {
    id: 'dragon',
    title: 'Dragon Tale',
    icon: 'dragon',
    color: colors.primary,
    description: 'Draw a magical dragon and create an epic adventure!',
  },
  {
    id: 'princess',
    title: 'Princess Party',
    icon: 'crown',
    color: colors.secondary,
    description: 'Design a royal celebration with princesses and magic!',
  },
  {
    id: 'castle',
    title: 'Castle Adventure',
    icon: 'castle',
    color: colors.accent,
    description: 'Build a magnificent castle and explore its mysteries!',
  },
  {
    id: 'explorer',
    title: 'Word Explorer',
    icon: 'book-search',
    color: colors.primary,
    description: 'Learn new words through your magical stories!',
  },
];

const HighlightCard = ({ card }: { card: StoryCard }) => {
  const [animation] = React.useState(new Animated.Value(1));
  const navigation = useNavigation<NavigationProps>();

  const handlePressIn = () => {
    Animated.spring(animation, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (card.id === 'explorer') {
      navigation.navigate('WordExplorer');
    } else {
      navigation.navigate('Drawing', { id: 'new' });
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          styles.card,
          { transform: [{ scale: animation }] }
        ]}
      >
        <View style={[styles.iconContainer, { backgroundColor: card.color }]}>
          <MaterialCommunityIcons name={card.icon} size={32} color={colors.background} />
        </View>
        <Text style={styles.cardTitle}>{card.title}</Text>
        <Text style={styles.cardDescription}>{card.description}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export const StoryHighlights = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Highlights</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {STORY_CARDS.map((card) => (
          <HighlightCard key={card.id} card={card} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  scrollContent: {
    paddingHorizontal: spacing.xs,
    gap: spacing.md,
  },
  card: {
    width: 200,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.md,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  cardDescription: {
    ...typography.body2,
    color: colors.text.secondary,
  },
});

export default StoryHighlights;
