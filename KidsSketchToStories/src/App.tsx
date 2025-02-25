// src/App.tsx
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, LogBox } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Store and Navigation
import { store } from './store/index';
import { AppNavigator } from './navigation/AppNavigator';
import { RootStackParamList } from './types/navigation';
import { useAuth } from './hooks/useAuth';

// Components
import { LoadingOverlay } from './components/common/LoadingOverlay';
import { ErrorBoundary } from './components/error/ErrorBoundary';

// Disable non-critical warnings during development
LogBox.ignoreLogs([
  'Require cycle:',
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);

console.log('Starting App initialization');

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppContent = () => {
  const { loading } = useAuth();

  // Show loading screen while initializing auth
  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PaperProvider>
          <SafeAreaProvider>
            <GestureHandlerRootView style={styles.container}>
              <AppContent />
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </PaperProvider>
      </Provider>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// Add performance monitoring
if (__DEV__) {
  const updateInterval = 1000;
  let lastUpdate = Date.now();
  let frames = 0;

  const calculateFPS = () => {
    const now = Date.now();
    const delta = now - lastUpdate;
    frames++;
    if (delta >= updateInterval) {
      const fps = Math.round(frames * 1000 / delta);
      console.log(`Current FPS: ${fps}`);
      frames = 0;
      lastUpdate = now;
    }
    requestAnimationFrame(calculateFPS);
  };

  requestAnimationFrame(calculateFPS);
}

export default App;
