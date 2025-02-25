// src/screens/TestScreen.tsx
import React, { useState } from 'react';
import { View, ScrollView, Button, StyleSheet } from 'react-native';
import { DrawingCanvas } from '../components/drawing/DrawingCanvas';
import { StoryViewer } from '../components/story/StoryViewer';
import { CameraCapture } from '../components/camera/CameraCapture';

// Mock story data
const mockStory = {
  id: '1',
  title: 'Test Story',
  pages: [
    {
      content: 'This is a test page',
      drawing: {
        id: '1',
        imageUrl: 'https://placeholder.com/150',
      },
    }
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ageGroup: '5-8',
};

export const TestScreen: React.FC = () => {
  const [currentTest, setCurrentTest] = useState<string | null>(null);

  const handleCapture = (imageUri: string) => {
    console.log('Captured:', imageUri);
  };

  const renderTest = () => {
    switch (currentTest) {
      case 'drawing':
        return (
          <DrawingCanvas
            tool="pencil"
            color="#000000"
            size={3}
          />
        );
      case 'story':
        return (
          <StoryViewer
            story={mockStory}
            currentPage={0}
            onPageChange={(page) => console.log('Page changed:', page)}
          />
        );
      case 'camera':
        return <CameraCapture onCapture={handleCapture} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button 
          title="Test Drawing" 
          onPress={() => setCurrentTest('drawing')} 
        />
        <Button 
          title="Test Story Viewer" 
          onPress={() => setCurrentTest('story')} 
        />
        <Button 
          title="Test Camera" 
          onPress={() => setCurrentTest('camera')} 
        />
      </View>
      <View style={styles.testArea}>
        {renderTest()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    padding: 10,
    gap: 10,
  },
  testArea: {
    flex: 1,
    minHeight: 400,
    backgroundColor: '#f5f5f5',
  },
});

export default TestScreen;