import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
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

export const SignUpScreen = ({ navigation, route }: AuthStackScreenProps<'SignUp'>) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(route.params?.plan || 'free');
  const { signUp, loading, error } = useAuth();

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await signUp(email, password);
      // TODO: Store user's name and selected plan in Firestore after successful signup
    } catch (error) {
      // Error is handled by the auth hook and shown in the UI
      console.error('Sign up error:', error);
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
              name="rocket-launch" 
              size={64} 
              color={colors.primary} 
            />
            <Text style={styles.title}>Join the Adventure!</Text>
            <Text style={styles.subtitle}>
              Create an account to start your creative journey
            </Text>
          </View>

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons 
                name="account-outline" 
                size={24} 
                color={colors.text.secondary} 
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                placeholderTextColor={colors.text.disabled}
                editable={!loading}
              />
            </View>

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

            <View style={styles.inputContainer}>
              <MaterialCommunityIcons 
                name="lock-outline" 
                size={24} 
                color={colors.text.secondary} 
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholderTextColor={colors.text.disabled}
                editable={!loading}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.showPasswordButton}
                disabled={loading}
              >
                <MaterialCommunityIcons 
                  name={showPassword ? "eye-off" : "eye"} 
                  size={24} 
                  color={colors.text.secondary} 
                />
              </TouchableOpacity>
            </View>

            <View style={styles.planSelection}>
              <Text style={styles.planTitle}>Choose Your Plan</Text>
              
              <TouchableOpacity
                style={[
                  styles.planCard,
                  selectedPlan === 'free' && styles.selectedPlan
                ]}
                onPress={() => setSelectedPlan('free')}
                disabled={loading}
              >
                <MaterialCommunityIcons 
                  name="star-outline" 
                  size={32} 
                  color={selectedPlan === 'free' ? colors.background : colors.primary} 
                />
                <View style={styles.planInfo}>
                  <Text style={[
                    styles.planName,
                    selectedPlan === 'free' && styles.selectedPlanText
                  ]}>Free</Text>
                  <Text style={[
                    styles.planPrice,
                    selectedPlan === 'free' && styles.selectedPlanText
                  ]}>$0/month</Text>
                </View>
                <View style={styles.planFeatures}>
                  <Text style={[
                    styles.planFeature,
                    selectedPlan === 'free' && styles.selectedPlanText
                  ]}>• 3 stories per month</Text>
                  <Text style={[
                    styles.planFeature,
                    selectedPlan === 'free' && styles.selectedPlanText
                  ]}>• Basic drawing tools</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.planCard,
                  styles.proPlan,
                  selectedPlan === 'pro' && styles.selectedPlan
                ]}
                onPress={() => setSelectedPlan('pro')}
                disabled={loading}
              >
                <MaterialCommunityIcons 
                  name="star" 
                  size={32} 
                  color={selectedPlan === 'pro' ? colors.background : colors.primary} 
                />
                <View style={styles.planInfo}>
                  <Text style={[
                    styles.planName,
                    selectedPlan === 'pro' && styles.selectedPlanText
                  ]}>Pro</Text>
                  <Text style={[
                    styles.planPrice,
                    selectedPlan === 'pro' && styles.selectedPlanText
                  ]}>$4.99/month</Text>
                </View>
                <View style={styles.planFeatures}>
                  <Text style={[
                    styles.planFeature,
                    selectedPlan === 'pro' && styles.selectedPlanText
                  ]}>• Unlimited stories</Text>
                  <Text style={[
                    styles.planFeature,
                    selectedPlan === 'pro' && styles.selectedPlanText
                  ]}>• Advanced drawing tools</Text>
                  <Text style={[
                    styles.planFeature,
                    selectedPlan === 'pro' && styles.selectedPlanText
                  ]}>• Priority support</Text>
                </View>
                <View style={styles.proLabel}>
                  <Text style={styles.proLabelText}>MOST POPULAR</Text>
                </View>
              </TouchableOpacity>
            </View>

            <Button
              title="Create Account"
              onPress={handleSignUp}
              variant="primary"
              size="large"
              loading={loading}
              style={styles.signUpButton}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity 
                onPress={() => navigation.navigate('SignIn')}
                disabled={loading}
              >
                <Text style={styles.footerLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    marginBottom: spacing.xl,
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
  showPasswordButton: {
    padding: spacing.sm,
  },
  planSelection: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  planTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  planCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPlan: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  proPlan: {
    borderColor: colors.primary,
  },
  planInfo: {
    marginTop: spacing.sm,
  },
  planName: {
    ...typography.h3,
    color: colors.text.primary,
  },
  planPrice: {
    ...typography.body1,
    color: colors.text.secondary,
  },
  selectedPlanText: {
    color: colors.background,
  },
  planFeatures: {
    marginTop: spacing.md,
  },
  planFeature: {
    ...typography.body2,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  proLabel: {
    position: 'absolute',
    top: -12,
    right: spacing.lg,
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
  },
  proLabelText: {
    ...typography.caption,
    color: colors.background,
    fontWeight: 'bold',
  },
  signUpButton: {
    marginBottom: spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  footerLink: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
