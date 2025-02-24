import React from 'react';
import type { ParamListBase } from '@react-navigation/native';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

type NavigatorProps<T extends ParamListBase> = {
  Navigator: React.ComponentType<any>;
  screenOptions?: NativeStackNavigationOptions;
  screens: React.ReactNode;
  initialRouteName?: keyof T;
};

export function createNavigator<T extends ParamListBase>({
  Navigator,
  screenOptions,
  screens,
  initialRouteName,
}: NavigatorProps<T>) {
  return function NavigatorComponent() {
    return (
      <Navigator
        initialRouteName={initialRouteName}
        screenOptions={screenOptions}
      >
        {screens}
      </Navigator>
    );
  };
}
