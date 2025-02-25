import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TestScreen } from '../screens/TestScreen';
import { ErrorBoundary } from '../components/error/ErrorBoundary';
import { Platform } from 'react-native';
import { colors, typography } from '../themes/theme';
import { AuthNavigator } from './AuthNavigator';
import { AdminNavigator } from './AdminNavigator';
import { useAuth } from '../hooks/useAuth';

// Import your screens
import { DrawingScreen }  from '../screens/DrawingScreen';
import { CameraScreen } from '../screens/CameraScreen';
import { StoryScreen } from '../screens/StoryScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { GalleryScreen } from '../screens/GalleryScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { StoryCreationScreen } from '../screens/StoryCreationScreen';
import { CustomizeStoryScreen } from '../screens/CustomizeStoryScreen';
import { WordExplorerScreen } from '../screens/WordExplorerScreen';
import { EditProfileScreen } from '../screens/EditProfileScreen';

import type { RootStackParamList, TabParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Create MainTabs component
function MainTabs() {
  const tabNavigatorProps = {
    screenOptions: {
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.text.disabled,
      tabBarStyle: {
        backgroundColor: colors.background,
        borderTopWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        borderTopColor: colors.border,
        height: 60,
        paddingBottom: 8,
        paddingTop: 8,
      },
      tabBarLabelStyle: {
        ...typography.body2,
        marginTop: 4,
      },
    },
    children: (
      <>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Gallery"
          component={GalleryScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="image-multiple" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="WordExplorer"
          component={WordExplorerScreen}
          options={{
            title: "Word Explorer",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="book-open-variant" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="cog" size={24} color={color} />
            ),
          }}
        />
      </>
    )
  } as const;

  return <Tab.Navigator {...tabNavigatorProps} />;
}

export function AppNavigator() {
  const { isAuthenticated, user } = useAuth();

  const stackNavigatorProps = {
    screenOptions: {
      headerShown: false,
      contentStyle: { backgroundColor: colors.background },
      headerStyle: {
        backgroundColor: colors.background,
        ...Platform.select({
          android: {
            elevation: 0,
          },
          ios: {
            shadowOpacity: 0,
          },
        }),
      },
    },
    children: (
      <>
        {!isAuthenticated ? (
          <Stack.Screen 
            name="Auth"
            component={AuthNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <>
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
              component={StoryScreenWithErrorBoundary}
              options={{
                headerShown: true,
                title: 'Your Story',
                headerBackTitle: 'Back',
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
              name="CustomizeStory" 
              component={CustomizeStoryScreenWithErrorBoundary}
              options={{
                headerShown: true,
                title: 'Customize Story',
                headerBackTitle: 'Back',
              }}
            />
            <Stack.Screen 
              name="StoryCreation" 
              component={StoryCreationScreenWithErrorBoundary}
              options={{
                headerShown: true,
                title: 'Create Story',
                headerBackTitle: 'Back',
              }}
            />
            <Stack.Screen 
              name="EditProfile" 
              component={EditProfileScreen}
              options={{
                headerShown: true,
                title: 'Edit Profile'
              }}
            />
            {user?.isAdmin && (
              <Stack.Screen 
                name="Admin"
                component={AdminNavigator}
                options={{ headerShown: false }}
              />
            )}
          </>
        )}
      </>
    )
  } as const;

  return <Stack.Navigator {...stackNavigatorProps} />;
}

// Create wrapped components with ErrorBoundary
const GalleryScreenWithErrorBoundary = () => {
  const errorBoundaryProps = {
    children: <GalleryScreen />
  } as const;

  return <ErrorBoundary {...errorBoundaryProps} />;
};

const StoryScreenWithErrorBoundary = () => {
  const errorBoundaryProps = {
    children: <StoryScreen />
  } as const;

  return <ErrorBoundary {...errorBoundaryProps} />;
};

const StoryCreationScreenWithErrorBoundary = () => {
  const errorBoundaryProps = {
    children: <StoryCreationScreen />
  } as const;

  return <ErrorBoundary {...errorBoundaryProps} />;
};

const CustomizeStoryScreenWithErrorBoundary = () => {
  const errorBoundaryProps = {
    children: <CustomizeStoryScreen />
  } as const;

  return <ErrorBoundary {...errorBoundaryProps} />;
};

export default AppNavigator;
