import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../types/navigation';
import { colors, typography } from '../themes/theme';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const defaultScreenOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: colors.background,
  },
  headerTintColor: colors.text.primary,
  headerTitleStyle: {
    ...typography.h2,
  },
};

/**
 * AuthNavigator component used as a screen in AppNavigator
 */
export const AuthNavigator: React.FC = () => {
  const navigatorProps = {
    screenOptions: defaultScreenOptions,
    children: (
      <>
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ title: 'Sign In' }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: 'Create Account' }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ title: 'Reset Password' }}
        />
      </>
    )
  } as const;

  return <Stack.Navigator {...navigatorProps} />;
};
