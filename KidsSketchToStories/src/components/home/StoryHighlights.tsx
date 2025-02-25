import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../themes/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../../types/navigation';

interface HighlightCardProps {
  title: string;
  icon: string;
  color: string;
  onPress: () => void;
}

const HighlightCard = React.memo<HighlightCardProps>(({ title, icon, color, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={[styles.iconContainer, { backgroundColor: color + '10' }]}>
      <MaterialCommunityIcons name={icon} size={32} color={color} />
    </View>
    <Text style={styles.cardTitle}>{title}</Text>
  </TouchableOpacity>
));

HighlightCard.displayName = 'HighlightCard';

export const StoryHighlights = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Highlights</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <HighlightCard
          title="Dragon Tale"
          icon="dragon"
          color={colors.primary}
          onPress={() => navigation.navigate('Gallery')}
        />
        <HighlightCard
          title="Princess Party"
          icon="crown"
          color={colors.secondary}
          onPress={() => navigation.navigate('Gallery')}
        />
        <HighlightCard
          title="Castle Adventure"
          icon="castle"
          color={colors.accent}
          onPress={() => navigation.navigate('Gallery')}
        />
        <HighlightCard
          title="Word Explorer"
          icon="book-search"
          color={colors.primary}
          onPress={() => navigation.navigate('WordExplorer')}
        />
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
    paddingRight: spacing.lg,
  },
  card: {
    width: 120,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginRight: spacing.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cardTitle: {
    ...typography.body2,
    color: colors.text.primary,
    textAlign: 'center',
  },
});

export default StoryHighlights;
