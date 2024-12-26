// src/screens/TestScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  SafeAreaView
} from 'react-native';

export const TestScreen: React.FC = () => {
  const [currentTest, setCurrentTest] = useState<string>('');

  const TestButton = ({ title, onPress }: { title: string; onPress: () => void }) => (
    <TouchableOpacity 
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Kids Story Creator - Test Panel</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TestButton 
            title="Test Drawing Canvas" 
            onPress={() => setCurrentTest('drawing')}
          />
          <TestButton 
            title="Test Camera" 
            onPress={() => setCurrentTest('camera')}
          />
          <TestButton 
            title="Test Story Viewer" 
            onPress={() => setCurrentTest('story')}
          />
        </View>

        <View style={styles.testArea}>
          <Text style={styles.testAreaText}>
            Current Test: {currentTest || 'None'}
          </Text>
          {/* Test component will render here */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 16,
    backgroundColor: '#007AFF',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  buttonContainer: {
    padding: 16,
    gap: 12,
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    color: '#007AFF',
    textAlign: 'center',
  },
  testArea: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    minHeight: 200,
    elevation: 2,
  },
  testAreaText: {
    fontSize: 16,
    color: '#333333',
  },
});