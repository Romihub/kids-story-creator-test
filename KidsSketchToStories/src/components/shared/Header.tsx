import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../../types/navigation';
import { colors, spacing, borderRadius, shadows } from '../../themes/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../hooks/useAuth';
import auth from '@react-native-firebase/auth';

export const Header = () => {
  const navigation = useNavigation<NavigationProps>();
  const { isAuthenticated } = useAuth();
  const firebaseUser = auth().currentUser;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
          style={styles.logoContainer}
        >
          <MaterialCommunityIcons 
            name="pencil-box-multiple" 
            size={32} 
            color={colors.primary} 
          />
        </TouchableOpacity>

        <View style={styles.rightSection}>
          {isAuthenticated && (
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}
              style={styles.profileButton}
            >
              {firebaseUser?.photoURL ? (
                <Image 
                  source={{ uri: firebaseUser.photoURL }} 
                  style={styles.profilePhoto}
                  resizeMode="cover"
                />
              ) : (
                <MaterialCommunityIcons 
                  name="account-circle" 
                  size={32} 
                  color={colors.text.primary} 
                />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    ...shadows.sm,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  logoContainer: {
    padding: spacing.sm,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  profileButton: {
    padding: spacing.sm,
    borderRadius: borderRadius.round,
    backgroundColor: colors.surface,
    ...shadows.sm,
  },
  profilePhoto: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.round,
  },
});

export default Header;
