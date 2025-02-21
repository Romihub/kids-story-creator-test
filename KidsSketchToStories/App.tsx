// App.tsx
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { firebase } from './src/config/firebase';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';
import { AppNavigator } from './src/navigation/AppNavigator';

const App = () => {
  useEffect(() => {
    if (!firebase.apps.length) {
      console.error('Firebase not initialized');
    }
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
      </AuthProvider>
    </Provider>
  );
};

export default App;
