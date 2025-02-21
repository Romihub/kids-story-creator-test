//src/screens/HomeScreen.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../types/navigation';

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Kids Story Creator</Text>
      </View>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Drawing', { id: 'new' })}
        >
          <Icon name="brush" size={32} color="#007AFF" />
          <Text style={styles.buttonText}>New Drawing</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Camera')}
        >
          <Icon name="camera-alt" size={32} color="#007AFF" />
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Gallery')}
        >
          <Icon name="photo-library" size={32} color="#007AFF" />
          <Text style={styles.buttonText}>Gallery</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    gap: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    gap: 12,
  },
  buttonText: {
    fontSize: 18,
    color: '#333',
  },
});

export default HomeScreen;
