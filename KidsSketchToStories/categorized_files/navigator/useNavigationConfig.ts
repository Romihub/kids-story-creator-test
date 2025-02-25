import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import { colors, typography } from '../themes/theme';

export const useNavigationConfig = () => {
  const defaultStackOptions: NativeStackNavigationOptions = {
    headerShown: true,
    headerStyle: {
      backgroundColor: colors.background,
    },
    headerTintColor: colors.text.primary,
    headerTitleStyle: {
      ...typography.h2,
    },
  };

  const defaultTabOptions: MaterialTopTabNavigationOptions = {
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.text.disabled,
    tabBarIndicatorStyle: {
      backgroundColor: colors.primary,
      height: 3,
    },
    tabBarStyle: {
      backgroundColor: colors.background,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tabBarLabelStyle: {
      ...typography.button,
      textTransform: 'none',
    },
  };

  return {
    defaultStackOptions,
    defaultTabOptions,
  };
};
