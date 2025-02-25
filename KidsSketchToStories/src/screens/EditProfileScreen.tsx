import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Text as RNText, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius } from '../themes/theme';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../types/navigation';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import type { AuthUser } from '../types/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const currentUser = auth().currentUser as AuthUser;

  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!currentUser) return;

    setLoading(true);
    try {
      const updates: { displayName?: string; email?: string } = {};

      if (displayName !== currentUser.displayName) {
        updates.displayName = displayName;
      }

      if (email !== currentUser.email) {
        updates.email = email;
      }

      // Update Firebase Auth profile
      if (Object.keys(updates).length > 0) {
        await currentUser.updateProfile(updates);

        // Update Firestore user document
        await firestore()
          .collection('users')
          .doc(currentUser.uid)
          .update({
            displayName: updates.displayName,
            email: updates.email,
            updatedAt: firestore.FieldValue.serverTimestamp(),
          });
      }

      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.titleContainer}>
          <RNText style={styles.title}>Edit Profile</RNText>
        </View>

        <View style={styles.form}>
          <TextInput
            label="Display Name"
            value={displayName}
            onChangeText={setDisplayName}
            mode="outlined"
            style={styles.input}
            autoCapitalize="words"
          />

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={handleSave}
              disabled={loading}
            >
              <RNText style={styles.buttonText}>
                {loading ? 'Saving...' : 'Save Changes'}
              </RNText>
              {loading && (
                <MaterialCommunityIcons name="loading" size={20} color={colors.surface} style={styles.loadingIcon} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() => navigation.goBack()}
              disabled={loading}
            >
              <RNText style={[styles.buttonText, styles.secondaryButtonText]}>
                Cancel
              </RNText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
  },
  titleContainer: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    fontSize: 32,
    fontWeight: 'bold',
  },
  form: {
    gap: spacing.md,
  },
  input: {
    backgroundColor: colors.surface,
    marginBottom: spacing.md,
  },
  buttonContainer: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  button: {
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: spacing.xs,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: colors.primary,
  },
  loadingIcon: {
    marginLeft: spacing.sm,
  },
});

export default EditProfileScreen;
