// src/App.tsx
import React, { useEffect, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, LogBox } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

// Store and Navigation
import { store } from './store';
import { AppNavigator } from './navigation/AppNavigator';
import { RootStackParamList } from './types/navigation';

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

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    console.log('Auth state changed:', user ? 'User logged in' : 'User logged out');
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    console.log('App mounted');

    // Subscribe to auth state changes
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return () => {
      console.log('App unmounting');
      subscriber(); // Unsubscribe on unmount
    };
  }, []);

  // Show loading screen while initializing Firebase Auth
  if (initializing) {
    return <LoadingOverlay />;
  }

  return (
    <ErrorBoundary>
      <ReduxProvider store={store}>
        <PaperProvider>
          <SafeAreaProvider>
            <GestureHandlerRootView style={styles.container}>
              <NavigationContainer>
                <AppNavigator />
              </NavigationContainer>
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </PaperProvider>
      </ReduxProvider>
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