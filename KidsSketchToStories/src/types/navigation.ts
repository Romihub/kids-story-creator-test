// src/types/navigation.ts
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
    MainTabs: undefined;
  Drawing: { id: string; imageUri?: string; mode?: 'new' | 'edit' | 'view' };
    Story: { id: string };
    Camera: undefined;
    Test: undefined;
    Gallery: undefined;
    StoryCreation: undefined;
    Subscription: undefined;
    Settings: undefined;
};

export type TabParamList = {
    Home: undefined;
    Gallery: undefined;
    Settings: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
export type DrawingScreenRouteProp = RouteProp<RootStackParamList, 'Drawing'>;
