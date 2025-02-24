import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../themes/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Word {
  id: string;
  word: string;
  definition: string;
  example: string;
  category: string;
  mastered: boolean;
}

// Sample words - in a real app, this would come from an API or database
const SAMPLE_WORDS: Word[] = [
  {
    id: '1',
    word: 'Adventure',
    definition: 'An exciting or unusual experience',
    example: 'Going on a magical adventure with a dragon',
    category: 'Story Words',
    mastered: false,
  },
  {
    id: '2',
    word: 'Magnificent',
    definition: 'Very beautiful, elaborate, or impressive',
    example: 'The magnificent castle touched the clouds',
    category: 'Descriptive Words',
    mastered: false,
  },
  {
    id: '3',
    word: 'Mysterious',
    definition: 'Difficult to understand or explain; strange',
    example: 'The mysterious forest was full of secrets',
    category: 'Descriptive Words',
    mastered: false,
  },
  {
    id: '4',
    word: 'Enchanted',
    definition: 'Under a magical spell',
    example: 'The enchanted garden was always blooming',
    category: 'Story Words',
    mastered: false,
  },
];

type WordCardProps = {
  word: Word;
  onToggleMastered: () => void;
  key?: string;
};

const WordCard: React.FC<WordCardProps> = ({ word, onToggleMastered }) => {
  const [animation] = React.useState(new Animated.Value(1));
  const [isFlipped, setIsFlipped] = useState(false);

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

  return (
    <TouchableOpacity
      onPress={() => setIsFlipped(!isFlipped)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          styles.wordCard,
          { transform: [{ scale: animation }] },
          word.mastered && styles.masteredCard,
        ]}
      >
        {!isFlipped ? (
          <>
            <View style={styles.wordHeader}>
              <Text style={styles.word}>{word.word}</Text>
              <TouchableOpacity
                onPress={onToggleMastered}
                style={[
                  styles.masteredButton,
                  word.mastered && styles.masteredButtonActive,
                ]}
              >
                <MaterialCommunityIcons
                  name={word.mastered ? 'star' : 'star-outline'}
                  size={24}
                  color={word.mastered ? colors.accent : colors.text.disabled}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.category}>{word.category}</Text>
            <Text style={styles.definition}>{word.definition}</Text>
            <Text style={styles.tapHint}>Tap to see example</Text>
          </>
        ) : (
          <>
            <Text style={styles.exampleTitle}>Example:</Text>
            <Text style={styles.example}>{word.example}</Text>
            <Text style={styles.tapHint}>Tap to flip back</Text>
          </>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export const WordExplorerScreen = () => {
  const [words, setWords] = useState(SAMPLE_WORDS);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWords = words.filter(word =>
    word.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
    word.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleMastered = (wordId: string) => {
    setWords(words.map(word =>
      word.id === wordId ? { ...word, mastered: !word.mastered } : word
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Word Explorer</Text>
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons
            name="magnify"
            size={24}
            color={colors.text.secondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search words..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.text.disabled}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {filteredWords.map(word => (
          <WordCard
            key={word.id}
            word={word}
            onToggleMastered={() => handleToggleMastered(word.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
    ...shadows.sm,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.sm,
    ...shadows.sm,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.body1,
    color: colors.text.primary,
    padding: 0,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  wordCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.md,
  },
  masteredCard: {
    backgroundColor: colors.surface,
    borderColor: colors.accent,
    borderWidth: 2,
  },
  wordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  word: {
    ...typography.h2,
    color: colors.text.primary,
  },
  masteredButton: {
    padding: spacing.xs,
  },
  masteredButtonActive: {
    transform: [{ scale: 1.1 }],
  },
  category: {
    ...typography.body2,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  definition: {
    ...typography.body1,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  exampleTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  example: {
    ...typography.body1,
    color: colors.text.secondary,
    fontStyle: 'italic',
    marginBottom: spacing.md,
  },
  tapHint: {
    ...typography.body2,
    color: colors.text.disabled,
    textAlign: 'center',
  },
});

export default WordExplorerScreen;
