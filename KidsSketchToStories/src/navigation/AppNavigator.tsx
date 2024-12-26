// src/navigation/AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TestScreen } from '../screens/TestScreen';
import { ErrorBoundary } from '../components/error/ErrorBoundary';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { Platform } from 'react-native';
//unused imports
import {
  NavigationContainer,
  NavigationProp,
  RouteProp,
} from '@react-navigation/native';

// Import your screens
import { DrawingScreen }  from '../screens/DrawingScreen';
import { CameraScreen } from '../screens/CameraScreen';
import { StoryScreen } from '../screens/StoryScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { GalleryScreen } from '../screens/GalleryScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { StoryCreationScreen } from '../screens/StoryCreationScreen';

// Define navigation types - moved to src/types/navigation.ts
//type RootStackParamList = {
//  MainTabs: undefined;
//  Drawing: undefined;
//  Camera: undefined;
//  Story: undefined;
//  Test: undefined;
//  Gallery: undefined;
//};

type TabParamList = {
  Home: undefined;
  Gallery: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Create MainTabs component
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999999',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="photo-library" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#FFFFFF' },
        headerStyle: {
          backgroundColor: '#FFFFFF',
          // Use proper typing for platform-specific styles
          ...Platform.select({
            android: {
              elevation: 0,
            },
            ios: {
              shadowOpacity: 0,
            },
          }),
        },
      }}
    >
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Drawing" 
        component={DrawingScreen}
        options={{
          headerShown: true,
          title: 'Create Drawing'
        }}
      />
      <Stack.Screen 
        name="Camera" 
        component={CameraScreen}
        options={{
          headerShown: true,
          title: 'Take Photo'
        }}
      />
      <Stack.Screen 
        name="Story" 
        component={StoryScreen}
        options={{
          headerShown: true,
          title: 'Your Story'
        }}
      />
      <Stack.Screen 
        name="Test" 
        component={TestScreen}
        options={{
          headerShown: true,
          title: 'Feature Testing'
        }}
      />
      <Stack.Screen 
        name="Gallery" 
        component={GalleryScreenWithErrorBoundary}
        options={{
          headerShown: true,
          title: 'Gallery'
        }}
      />
      <Stack.Screen 
        name="StoryCreation" 
        component={StoryCreationScreen}
        options={{ title: 'Create Story' }}
      />
    </Stack.Navigator>
  );
}

// Create a wrapped component for GalleryScreen with ErrorBoundary
const GalleryScreenWithErrorBoundary: React.FC<NativeStackScreenProps<RootStackParamList, 'Gallery'>> = (props) => (
  <ErrorBoundary>
    <GalleryScreen {...props} />
  </ErrorBoundary>
);

// Export types for use in screens
export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  NativeStackScreenProps<RootStackParamList, T>;

export default AppNavigator;