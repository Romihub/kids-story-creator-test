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

// Utility type to make navigator props more flexible
type NavigatorBaseProps = {
  screenOptions?: any;
  children?: React.ReactNode;
  initialRouteName?: string;
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
  Home: undefined;
  Gallery: undefined;
  WordExplorer: undefined;
  Settings: undefined;
};

// Gallery Tab Types
export type GalleryTabParamList = {
  Drawings: undefined;
  Stories: undefined;
};

// Root Stack Types
export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<TabParamList>;
  Drawing: { id: string; imageUri?: string; mode?: 'new' | 'edit' | 'view' };
  Story: { id: string };
  Camera: undefined;
  Test: undefined;
  Gallery: undefined;
  StoryCreation: undefined;
  Subscription: undefined;
  Settings: undefined;
  WordExplorer: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Admin: NavigatorScreenParams<AdminStackParamList>;
  UserProfile: undefined;
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
  children?: React.ReactNode;
};

// Navigator Component Types
export type NavigatorComponent<T> = React.FC<{
  screenOptions?: NativeStackNavigationOptions;
  children?: React.ReactNode;
  initialRouteName?: keyof T;
}>;

// Material Top Tab Navigator Props
export type MaterialTopTabNavigatorProps = {
  screenOptions?: MaterialTopTabNavigationOptions;
  children?: React.ReactNode;
  initialRouteName?: keyof GalleryTabParamList;
};

// Navigator Props with Children
export type NavigatorWithChildrenProps<T> = {
  screenOptions?: NativeStackNavigationOptions;
  children: React.ReactNode;
  initialRouteName?: keyof T;
};
