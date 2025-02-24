import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../../themes/theme';
import { Button } from '../../components/shared/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { AuthStackScreenProps } from '../../types/navigation';
import { useAuth } from '../../hooks/useAuth';

export const ForgotPasswordScreen = ({ navigation }: AuthStackScreenProps<'ForgotPassword'>) => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const { resetPassword, loading, error } = useAuth();

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    try {
      await resetPassword(email);
      setSent(true);
    } catch (error) {
      // Error is handled by the auth hook and shown in the UI
      console.error('Password reset error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <MaterialCommunityIcons 
              name={sent ? "email-check" : "email-lock"} 
              size={64} 
              color={colors.primary} 
            />
            <Text style={styles.title}>
              {sent ? "Check Your Email!" : "Reset Password"}
            </Text>
            <Text style={styles.subtitle}>
              {sent 
                ? "We've sent you instructions to reset your password"
                : "Enter your email and we'll send you instructions to reset your password"
              }
            </Text>
          </View>

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {!sent && (
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons 
                  name="email-outline" 
                  size={24} 
                  color={colors.text.secondary} 
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholderTextColor={colors.text.disabled}
                  editable={!loading}
                />
              </View>

              <Button
                title="Send Reset Instructions"
                onPress={handleResetPassword}
                variant="primary"
                size="large"
                loading={loading}
                style={styles.resetButton}
              />
            </View>
          )}

          <Button
            title={sent ? "Back to Sign In" : "Cancel"}
            onPress={() => navigation.navigate('SignIn')}
            variant="outline"
            size="large"
            icon={sent ? "login" : "close"}
            disabled={loading}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl * 2,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body1,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: colors.error.light,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  errorText: {
    ...typography.body2,
    color: colors.error.main,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    marginBottom: spacing.xl,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
    ...shadows.sm,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    height: 56,
    color: colors.text.primary,
    ...typography.body1,
  },
  resetButton: {
    marginTop: spacing.lg,
  },
});

export default ForgotPasswordScreen;
