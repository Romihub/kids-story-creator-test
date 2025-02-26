import type { 
  NativeStackScreenProps, 
  NativeStackNavigationOptions 
} from '@react-navigation/native-stack';
import type { 
  BottomTabScreenProps, 
  BottomTabNavigationOptions 
} from '@react-navigation/bottom-tabs';
import type { 
  MaterialTopTabScreenProps, 
  MaterialTopTabNavigationOptions
} from '@react-navigation/material-top-tabs';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { NavigatorScreenParams } from '@react-navigation/native';
import React from 'react';

// Story Settings Type
export interface StorySettings {
  ageGroup: string;
  storyLength: 'short' | 'medium' | 'long';
  theme: string;
  author?: string;
  gender?: 'boy' | 'girl' | null;
  coverImage?: string;
  includeVoiceNarration?: boolean;
  additionalIdeas?: string;
}

// Root Stack Types
export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<TabParamList> | { 
    screen: keyof TabParamList; 
    params?: TabParamList[keyof TabParamList];
  };
  Drawing: { id: string; imageUri?: string; mode?: 'new' | 'edit' | 'view' };
  Story: { id: string };
  Camera: undefined;
  Gallery: undefined;
  CustomizeStory: {
    imageUri?: string;
    storySettings?: StorySettings;
    drawingId?: string;
  };
  StoryCreation: {
    imageUri: string;
    storySettings: StorySettings;
  };
  Subscription: undefined;
  Settings: undefined;
  WordExplorer: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Admin: NavigatorScreenParams<AdminStackParamList>;
  UserProfile: undefined;
  EditProfile: undefined;
  Test: undefined;
};

// Auth Stack Types
export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: { plan?: 'free' | 'pro' };
  ForgotPassword: undefined;
};

// Admin Stack Types
export type AdminStackParamList = {
  Dashboard: undefined;
  UserManagement: undefined;
  Settings: undefined;
  Reports: undefined;
};

// Tab Navigator Types
export type TabParamList = {
  Home: {
    imageUri?: string;
    storySettings?: StorySettings;
  } | undefined;
  Gallery: undefined;
  WordExplorer: undefined;
  Settings: undefined;
};

// Gallery Tab Types
export type GalleryTabParamList = {
  Drawings: undefined;
  Stories: undefined;
};

// Screen Props Types
export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;
export type AuthStackScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<AuthStackParamList, T>;
export type AdminStackScreenProps<T extends keyof AdminStackParamList> = NativeStackScreenProps<AdminStackParamList, T>;
export type TabScreenProps<T extends keyof TabParamList> = BottomTabScreenProps<TabParamList, T>;
export type GalleryTabScreenProps<T extends keyof GalleryTabParamList> = MaterialTopTabScreenProps<GalleryTabParamList, T>;

// Navigation Props Types
export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
export type AdminNavigationProp = NativeStackNavigationProp<AdminStackParamList>;
export type TabNavigationProp = NativeStackNavigationProp<TabParamList>;
export type GalleryTabNavigationProp = NativeStackNavigationProp<GalleryTabParamList>;

// Route Props Types
export type DrawingScreenRouteProp = RouteProp<RootStackParamList, 'Drawing'>;
export type CustomizeStoryScreenRouteProp = RouteProp<RootStackParamList, 'CustomizeStory'>;
export type StoryCreationScreenRouteProp = RouteProp<RootStackParamList, 'StoryCreation'>;
export type StoryScreenRouteProp = RouteProp<RootStackParamList, 'Story'>;
export type HomeScreenRouteProp = RouteProp<TabParamList, 'Home'>;

// Screen Component Types
export type ScreenComponent<T extends keyof RootStackParamList> = React.FC<RootStackScreenProps<T>>;
export type AuthScreenComponent<T extends keyof AuthStackParamList> = React.FC<AuthStackScreenProps<T>>;
export type AdminScreenComponent<T extends keyof AdminStackParamList> = React.FC<AdminStackScreenProps<T>>;
export type TabScreenComponent<T extends keyof TabParamList> = React.FC<TabScreenProps<T>>;
export type GalleryTabScreenComponent<T extends keyof GalleryTabParamList> = React.FC<GalleryTabScreenProps<T>>;

// Navigation Options Types
export type RootStackNavigationOptions = NativeStackNavigationOptions;
export type AuthStackNavigationOptions = NativeStackNavigationOptions;
export type AdminStackNavigationOptions = NativeStackNavigationOptions;
export type TabNavigationOptions = BottomTabNavigationOptions;
export type MaterialTopTabOptions = MaterialTopTabNavigationOptions;

// Navigator Props Types
export type NavigatorProps = {
  screenOptions?: NativeStackNavigationOptions;
  children: React.ReactNode;
  initialRouteName?: string;
};

// Material Top Tab Navigator Props
export type MaterialTopTabNavigatorProps = {
  screenOptions?: MaterialTopTabNavigationOptions;
  children: React.ReactNode;
  initialRouteName?: keyof GalleryTabParamList;
};
