// src/components/story/CharacterCustomizer.tsx
import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CharacterCustomizerProps {
  storyId: string;
}

interface Character {
  id: string;
  name: string;
  customizable: {
    color: boolean;
    outfit: boolean;
    accessories: boolean;
  };
}

export const CharacterCustomizer: React.FC<CharacterCustomizerProps> = ({ storyId }) => {
  const [selectedCharacter, setSelectedCharacter] = React.useState<string | null>(null);

  const characters: Character[] = [
    {
      id: '1',
      name: 'Main Hero',
      customizable: {
        color: true,
        outfit: true,
        accessories: true,
      },
    },
    // Add more characters as needed
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Character Customization</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {characters.map(character => (
          <TouchableOpacity
            key={character.id}
            style={[
              styles.characterButton,
              selectedCharacter === character.id && styles.selectedCharacter,
            ]}
            onPress={() => setSelectedCharacter(character.id)}
          >
            <Text style={styles.characterName}>{character.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  characterButton: {
    padding: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginRight: 8,
  },
  selectedCharacter: {
    backgroundColor: '#007AFF',
  },
  characterName: {
    color: '#333',
  },
}); 