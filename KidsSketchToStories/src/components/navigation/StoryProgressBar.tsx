import React, { Fragment } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing, borderRadius, shadows } from '../../themes/theme';

export type StoryStep = 'drawing' | 'customize' | 'generate';

interface StoryProgressBarProps {
  currentStep: StoryStep;
  onStepPress?: (step: StoryStep) => void;
  canNavigateBack?: boolean;
}

interface StepComponentProps {
  step: { id: StoryStep; label: string; icon: string };
  status: 'current' | 'completed' | 'upcoming';
  isClickable: boolean;
  onPress?: () => void;
  showConnector: boolean;
  isFirst: boolean;
}

const StepComponent = React.memo<StepComponentProps>(({ 
  step, 
  status, 
  isClickable, 
  onPress, 
  showConnector,
  isFirst
}) => {
  const iconColor = status === 'upcoming' ? colors.text.disabled : colors.primary;

  return (
    <View style={[styles.stepContainer, !isFirst && styles.stepContainerWithMargin]}>
      <View style={styles.stepWrapper}>
        <TouchableOpacity
          style={[
            styles.step,
            status === 'current' && styles.currentStep,
            status === 'completed' && styles.completedStep,
          ]}
          onPress={onPress}
          disabled={!isClickable}
        >
          <MaterialCommunityIcons
            name={step.icon}
            size={24}
            color={iconColor}
          />
          <Text
            style={[
              styles.stepLabel,
              status === 'upcoming' && styles.upcomingLabel,
            ]}
          >
            {step.label}
          </Text>
          {status === 'completed' && (
            <MaterialCommunityIcons
              name="check-circle"
              size={16}
              color={colors.success.main}
              style={styles.checkIcon}
            />
          )}
        </TouchableOpacity>
        {showConnector && (
          <View
            style={[
              styles.connector,
              status === 'completed' && styles.completedConnector,
            ]}
          />
        )}
      </View>
    </View>
  );
});

StepComponent.displayName = 'StepComponent';

const steps: Array<{ id: StoryStep; label: string; icon: string }> = [
  { id: 'drawing', label: 'Drawing', icon: 'pencil' },
  { id: 'customize', label: 'Customize', icon: 'palette' },
  { id: 'generate', label: 'Generate', icon: 'book-open-variant' },
];

export const StoryProgressBar = React.memo<StoryProgressBarProps>(({
  currentStep,
  onStepPress,
  canNavigateBack = true,
}) => {
  const getStepStatus = (stepId: StoryStep) => {
    const stepIndex = steps.findIndex(s => s.id === stepId);
    const currentIndex = steps.findIndex(s => s.id === currentStep);

    if (stepIndex === currentIndex) return 'current';
    if (stepIndex < currentIndex) return 'completed';
    return 'upcoming';
  };

  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const status = getStepStatus(step.id);
        const isClickable = canNavigateBack && status === 'completed';

        return (
          <Fragment key={step.id}>
            <StepComponent
              step={step}
              status={status}
              isClickable={isClickable}
              onPress={() => isClickable && onStepPress?.(step.id)}
              showConnector={index < steps.length - 1}
              isFirst={index === 0}
            />
          </Fragment>
        );
      })}
    </View>
  );
});

StoryProgressBar.displayName = 'StoryProgressBar';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    ...shadows.sm,
  },
  stepContainer: {
    flex: 1,
  },
  stepContainerWithMargin: {
    marginLeft: spacing.sm,
  },
  stepWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background,
  },
  currentStep: {
    backgroundColor: `${colors.primary}20`,
  },
  completedStep: {
    backgroundColor: `${colors.success.main}10`,
  },
  stepLabel: {
    marginLeft: spacing.sm,
    color: colors.text.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  upcomingLabel: {
    color: colors.text.disabled,
  },
  checkIcon: {
    marginLeft: spacing.xs,
  },
  connector: {
    flex: 1,
    height: 2,
    backgroundColor: colors.border,
    marginHorizontal: spacing.sm,
  },
  completedConnector: {
    backgroundColor: colors.primary,
  },
});

export default StoryProgressBar;
