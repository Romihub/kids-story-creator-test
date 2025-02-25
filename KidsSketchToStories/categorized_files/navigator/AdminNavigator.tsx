import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AdminStackParamList } from '../types/navigation';
import { colors, typography } from '../themes/theme';
import { AdminDashboardScreen } from '../screens/admin/AdminDashboardScreen';

const Stack = createNativeStackNavigator<AdminStackParamList>();

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

export const AdminNavigator = () => {
  const navigatorProps = {
    screenOptions: defaultScreenOptions,
    children: (
      <>
        <Stack.Screen
          name="Dashboard"
          component={AdminDashboardScreen}
          options={{ title: 'Admin Dashboard' }}
        />
        {/* Add other admin screens here as they are created */}
      </>
    )
  } as const;

  return <Stack.Navigator {...navigatorProps} />;
};

export default AdminNavigator;
