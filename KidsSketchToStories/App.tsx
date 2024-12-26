// App.tsx
import React, { useEffect } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { firebase } from './src/config/firebase';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';

const App = () => {
  useEffect(() => {
    if (!firebase.apps.length) {
      console.error('Firebase not initialized');
    }
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Hello Kids Story Creator!</Text>
          </View>
        </SafeAreaView>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;