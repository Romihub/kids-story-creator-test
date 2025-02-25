import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import type { ParamListBase } from '@react-navigation/native';

export function withNavigator<T extends ParamListBase>(
  Navigator: any,
  screenOptions: any,
  screens: React.ReactNode
) {
  return function NavigatorWrapper() {
    return (
      <Navigator screenOptions={screenOptions}>
        {screens}
      </Navigator>
    );
  };
}
